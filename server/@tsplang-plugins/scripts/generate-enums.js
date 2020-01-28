#!/usr/bin/env node
"use strict"

const colors = require("colors/safe")
const fsExtra = require("fs-extra")
const net = require("net")
const path = require("path")

/**
 * @typedef {Object} Arguments
 * @property {string} outputDir
 * @property {string} instrumentIpv4
 * @property {number} instrumentPort
 */
/** @namespace */
const Arguments = {}
/**
 * @param {Array<string>} argv
 * @returns {Arguments}
 */
Arguments.parse = function(argv) {
    // Print help and exit if the flag is present in the given arguments.
    ;(function(cmdlineArgs) {
        cmdlineArgs.forEach(arg => {
            switch (arg) {
                case "-h":
                case "--help":
                case "/?":
                    console.log(
                        [
                            "USAGE: node generate-enums.js {OUTPUT_DIR} {IPv4} [PORT]",
                            "",
                            "ARGUMENTS",
                            "  OUTPUT_DIR  Output directory for enumeration files.",
                            "  IPv4        Target instrument's IPv4 address.",
                            "  PORT        Optional port number. Defaults to 5025.",
                            "",
                            "FLAGS",
                            "  -h, --help, /?   Prints this message and exits.",
                            "",
                        ].join("\n")
                    )
                    process.exit(0)
                default:
                    break
            }
        })
    })(argv)

    // Verify the output directory
    let outputDir = argv.shift()
    if (outputDir === undefined) {
        console.error("Missing output directory argument.")
        process.exit(2)
    }
    outputDir = path.resolve(path.normalize(outputDir))
    if (!fsExtra.pathExistsSync(outputDir)) {
        console.error(`Path does not exist: ${outputDir}`)
        process.exit(2)
    } else if (!fsExtra.statSync(outputDir).isDirectory()) {
        console.error(`Path is not a directory: ${outputDir}`)
        process.exit(2)
    }

    // Verify the IPv4 address.
    const instrumentIpv4 = argv.shift()
    if (instrumentIpv4 === undefined) {
        console.error("Missing IPv4 address argument.")
        process.exit(2)
    } else {
        let die = false
        switch (net.isIPv4(instrumentIpv4)) {
            case 0:
                console.error(`Invalid IPv4 address: ${instrumentIpv4}`)
                die = true
                break
            case 6:
                console.error("IPv6 address are not supported.")
                die = true
                break
            default:
                break
        }
        if (die) process.exit(2)
    }

    // Verify the port (if given).
    /** @type {number|undefined} */
    let instrumentPort = argv.shift()
    if (instrumentPort !== undefined) {
        let portNum = Number(instrumentPort)
        if (isNaN(portNum)) {
            console.error(`Invalid port: ${instrumentPort}`)
            process.exit(2)
        } else if (portNum < 1) {
            console.error(`Port number must be greater than zero: ${instrumentPort}`)
            process.exit(2)
        }
        instrumentPort = portNum
    } else {
        instrumentPort = 5025
    }

    return {
        outputDir,
        instrumentIpv4,
        instrumentPort,
    }
}

/** @namespace */
const InstrumentComms = {
    SCRAPER: `
        SCRAPER = {
            prevprompts = nil,
            __make_entry = (
                function(enum)
                    if enum == nil then return ""; end;

                    if enum["__tostring"] ~= nil then
                        local result = tostring(enum);

                        if enum["__tonumber"] ~= nil then
                            result = result.."\\t"..tostring(tonumber(enum));
                        end;

                        return result.."\\n";
                    end;

                    return "";
                end;
            ),
            __mtable = getmetatable(smu.ON),
            __consecutive_nils = 0,
            __i = 0,
            next = (
                function(self)
                    while (self.__i < 16777215) do
                        local enumtable = self.__mtable[self.__i];
                        self.__i = self.__i + 1;

                        if enumtable ~= nil then
                            self.__consecutive_nils = 0;
                            local packet = "";

                            local zeroth = enumtable[0];
                            if zeroth ~= nil then
                                packet = self.__make_entry(zeroth);
                            end;

                            for j,enum in ipairs(enumtable) do
                                packet = packet..self.__make_entry(enum);
                            end;

                            if packet ~= "" then
                                return tostring(self.__i - 1).."\\n"..packet;
                            end;
                        else
                            self.__consecutive_nils = self.__consecutive_nils + 1;
                        end;

                        if self.__consecutive_nils > 1000000 then
                            break;
                        end;
                    end;

                    return nil;
                end;
            ),
            done = (
                function(self)
                    localnode.prompts = self.prevprompts;
                    _G["SCRAPER"] = nil;
                    return nil;
                end;
            )
        };
        print(SCRAPER:next());
    `.replace(/\s{2,}|\n/gm, " "),

    /**
     * @memberof InstrumentComms
     * @param {string} ip
     * @param {number} port
     * @returns {Promise<Array<string>>} Returns the data received from the
     * instrument on Promise resolution.
     */
    connect: function(ip, port) {
        return new Promise((resolve, reject) => {
            let cleaned = false
            /** @type {Array<string>} */
            const received = []

            const socket = new net.Socket({
                readable: true,
                writable: true,
            })
            socket.once("connect", function() {
                console.log(`-> Connected to ${ip}:${port}`)
                socket.write(InstrumentComms.SCRAPER + "\n")
            })
            socket.on("data", function(data) {
                const str = data.toString().trim()
                console.log(`<- ${str}`)

                if (str === "nil") {
                    if (!cleaned) {
                        socket.write("print(SCRAPER:done())")
                        cleaned = true
                    } else {
                        if (!socket.destroyed) socket.end()
                    }
                } else {
                    received.push(str)
                    socket.write("print(SCRAPER:next())")
                }
            })
            socket.on("error", function(err) {
                reject(err)
            })
            socket.once("end", function() {
                console.log("-x Connection closed")
                socket.destroy()
                resolve(received)
            })

            socket.connect(port, ip)
        })
    },
}

/**
 * @typedef {Object} RawEnumGroup
 * @property {number} id
 * @property {Map<string, number>} entries
 */
/** @namespace */
const RawEnumGroup = {}
/**
 * Valid group strings take the form
 * ```text
 *<Group Number>\n
 *<Fully-Qualified Enum>\t<Enum Backing Value>\n
 *  ...
 *<Fully-Qualified Enum>\t<Enum Backing Value>\n
 * ```
 * @param {string} groupString
 * @returns {RawEnumGroup}
 * @throws {Error} If given group is blank.
 * @throws {Error} If given group contains less than 2 lines.
 * @throws {Error} If the group ID is not a number.
 * @throws {Error} If a group row has an unexpected number of columns.
 * @throws {Error} If an enum has no namespace accessors (".").
 * @throws {Error} If an enum's backing value is not a number.
 * @throws {Error} If any enum's containing table does not match the others in the group.
 * @throws {Error} If an enum appears more than once the same group with different values.
 */
RawEnumGroup.parse = function(groupString) {
    /**
     * @param {string} str
     * @returns {string}
     */
    function escape(str) {
        return str
            .replace(/\t/g, "\\t")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\0/g, "\\0")
    }
    /**
     * @param {string} details
     * @returns {Error}
     */
    function error(details, appendGroup = true) {
        let message = details.trim()
        if (appendGroup) {
            message += message.endsWith(".") ? " " : ". "
            message += `Group "${escape(groupString)}"`
        }
        return new Error(`${colors.red("ERR!")} ENUM STRING PARSE: ${message}`)
    }
    const EXPECTED_ENTRY_COLUMNS = 2

    /* Start */

    if (groupString === "") {
        throw error("Received blank group string", false)
    }

    const entries = groupString.split("\n")

    if (entries.length < 2) {
        throw error("Too few lines.")
    }

    /** @type {RawEnumGroup} */
    const result = {
        entries: new Map(),
    }

    const rawId = entries.shift()
    result.id = Number(rawId.trim())
    if (isNaN(result.id) || rawId.trim() === "") {
        throw error(`ID "${escape(rawId)}" is not a number.`)
    }

    for (let row of entries) {
        const columns = row.split("\t")

        if (columns.length !== EXPECTED_ENTRY_COLUMNS) {
            throw error(
                `Row "${escape(row)}" needs ${EXPECTED_ENTRY_COLUMNS} columns; found ${
                    columns.length
                }.`
            )
        }

        /** @type {string} */
        let fullyQualifiedEnum
        {
            const rawEnum = columns.shift()
            fullyQualifiedEnum = rawEnum.trim()
            if (fullyQualifiedEnum.split(".").length < 2) {
                throw error(`Enum "${rawEnum}" lacks namespace accessors (".").`)
            }
        }

        /** @type {number} */
        let enumValue
        {
            const rawBackingValue = columns.shift()
            enumValue = Number(rawBackingValue.trim())
            if (isNaN(enumValue) || rawBackingValue.trim() === "") {
                throw error(
                    `Backing value "${escape(
                        rawBackingValue
                    )}" of enum "${fullyQualifiedEnum}" is not a number.`
                )
            }
        }

        if (result.entries.size > 0) {
            // Since we throw an Error on mismatch, it is safe to blindly grab the
            // first Map value to use as the table namespace oracle.
            const existingEnum = [...result.entries.keys()][0]
            const namespace = existingEnum.slice(0, existingEnum.lastIndexOf("."))

            if (!fullyQualifiedEnum.startsWith(namespace)) {
                throw error(
                    `Expected "${fullyQualifiedEnum}" to have namespace "${namespace}".`
                )
            }
        }

        if (result.entries.has(fullyQualifiedEnum)) {
            // Check for a change in backing value if this enum is a duplicate.
            const previousValue = result.entries.get(fullyQualifiedEnum)
            if (enumValue !== previousValue) {
                throw error(
                    `Duplicate enum "${fullyQualifiedEnum}" changed value from "${previousValue}" to "${enumValue}".`
                )
            }
        } else {
            result.entries.set(fullyQualifiedEnum, enumValue)
        }
    }

    return result
}

/**
 * @typedef {Object} EnumGroup
 * @property {Map<string, number>} enums
 * @property {string} groupName
 * @property {Set<string>} requires
 * @property {string} tableNamespace
 */
/** @namespace */
const EnumGroup = {}
/**
 * @param {RawEnumGroup} rawGroup
 * @returns {EnumGroup}
 * @throws {Error} If given group has no entries.
 * @throws {Error} If given a mix of enum names with and without underscores.
 * @throws {Error} If enums have differing pre-underscore substrings.
 */
EnumGroup.from = function(rawGroup) {
    /**
     * @param {string} details
     * @returns {Error}
     */
    function error(details, appendId = true) {
        let message = details.trim()
        if (appendId) {
            message += message.endsWith(".") ? " " : ". "
            message += `Group #${rawGroup.id}"`
        }
        return new Error(`${colors.red("ERR!")} ENUM GROUP MAKER: ${message}`)
    }
    /**
     * @param {string} str
     * @returns {string}
     */
    function toPascalCase(str) {
        if (str.length === 0) return str

        const letters = str.toLowerCase().split("")
        const firstLetter = letters.shift().toUpperCase()
        letters.unshift(firstLetter)
        return letters.join("")
    }

    /* Start */

    if (rawGroup.entries.size === 0) {
        throw error("Raw group is empty.")
    }

    /** @type {EnumGroup} */
    const result = {
        enums: new Map(),
        requires: new Set(),
    }

    /* Construct a Map of enum names and backing values. */
    rawGroup.entries.forEach((v, k) => {
        result.enums.set(k.slice(k.lastIndexOf(".") + 1), v)
    })

    /** @type {Set<string>} */
    let groupNameParts

    /* Operations that require an array of enumeration names. */
    {
        const enumNames = [...result.enums.keys()]

        // Every enumeration must either have or lack an underscore.
        const allHaveUnderscores = enumNames.every(n => n.includes("_"))
        const allLackUnderscores = enumNames.every(n => !n.includes("_"))
        /**
         * Where H is "all have" and L is "all lack".
         * ```text
         * !(H ^ L) => !(XOR) => "XAND"
         * !(0 ^ 0) =>  !(0)  => true
         * !(0 ^ 1) =>  !(1)  => false
         * !(1 ^ 0) =>  !(1)  => false
         * !(1 ^ 1) =>  !(0)  => true
         * ```
         * The "all true" case is impossible, since every element cannot
         * simultaneously have and lack an underscore.
         */
        const shouldError = !(allHaveUnderscores ^ allLackUnderscores)
        if (shouldError) {
            throw error("Found enums with AND without underscores.")
        }

        const rawNameParts = new Set(
            enumNames[0].includes("_")
                ? enumNames.map(n => n.slice(0, n.indexOf("_")))
                : enumNames
        )

        if (enumNames[0].includes("_")) {
            // Every enumeration with an underscore must have the same substring
            // before the first underscore
            if (rawNameParts.size > 1) {
                throw error(
                    `Found multiple pre-underscore substrings: ${[
                        ...rawNameParts,
                    ].toString()}`
                )
            }
        }

        groupNameParts = new Set([...rawNameParts].map(n => toPascalCase(n)))
    }

    /** @type {string} */
    let groupNamePrefix

    const firstEnum = [...rawGroup.entries.keys()][0]
    const namespaceEndIndex = firstEnum.lastIndexOf(".")

    result.tableNamespace = firstEnum.slice(0, namespaceEndIndex)

    /* Operations that need an array of table namespaces. */
    {
        const tables = result.tableNamespace.split(".")

        /* Create a group name prefix from each table namespace. */
        tables.forEach(table => {
            groupNamePrefix = (groupNamePrefix || "") + toPascalCase(table)
        })

        /* Record import requirements for this table namespace. */
        while (tables.length > 2) {
            // Remove the first name until we have 2 names left.
            tables.shift()
        }
        // Only subtables need an import statement.
        // (Root tables would have a length of 1.)
        if (tables.length === 2) {
            // We only need the parent of our subtable.
            result.requires.add(tables.shift())
        }
    }

    /* Construct the group name. */
    result.groupName = groupNamePrefix
    groupNameParts.forEach(part => {
        result.groupName = (result.groupName || "") + part
    })

    /* Validate the result. */
    if (
        result.enums.size === 0 ||
        result.groupName === undefined ||
        result.requires === undefined ||
        result.tableNamespace === undefined
    ) {
        console.dir(result)
        throw error("Failed to construct a valid group.")
    }

    return result
}

class VirtualFile {
    /**
     * @param {EnumGroup} group
     * @param {string} dir The user-specified output directory.
     */
    constructor(group, dir) {
        /**
         * @type {string}
         */
        this._dir = dir

        /**
         * @type {Array<EnumGroup>}
         */
        this._groups = [group]

        /**
         * @type {string}
         */
        this._namespace = group.tableNamespace

        /**
         * @type {string?}
         */
        this._path = undefined

        /**
         * @type {Set<string>}
         */
        this._fields = new Set()

        /**
         * @type {Set<string>}
         */
        this._requires = new Set()

        /**
         * @type {Set<string>}
         */
        this._typeunions = new Set()
    }

    /**
     * @returns {string} A PathLike string.
     * @throws {Error} If the resolved file path lies outside the given output directory.
     */
    get path() {
        if (this._path) return this._path

        this._path = path.resolve(this._dir, this._namespace.replace(".", path.sep))

        if (!this._path.startsWith(this._dir)) {
            throw new Error(
                `VirtualFile path resolves outside the target directory: ${this._path}`
            )
        }

        this._path += ".tsp"

        return this._path
    }

    /**
     * Populates all empty sets.
     * @returns {void}
     */
    fill() {
        this._groups.forEach(g => {
            /** @type {Set<string>} */
            const fullyQualifiedEnums = new Set()

            // Populate fields and construct fully-qualified enums.
            g.enums.forEach((v, k) => {
                this._fields.add(VirtualFile.toField(k, v))

                fullyQualifiedEnums.add([g.tableNamespace, k].join("."))
            })

            // Populate imports.
            g.requires.forEach(req => {
                this._requires.add(VirtualFile.toRequire(req))
            })

            // Populate type unions.
            this._typeunions.add(
                VirtualFile.toTypeUnion(g.groupName, fullyQualifiedEnums)
            )
        })
    }

    /**
     * Get duplicate type union names.
     * @returns {Set<string>?} Returns a set of all conflicting type union
     * names or undefined if no conflicts exist.
     */
    getTypeUnionConflicts() {
        /** @type {Set<string>} */
        let conflicts = new Set()

        for (let currentGroup of this._groups) {
            const currentName = currentGroup.groupName
            if (
                !conflicts.has(currentName) &&
                this._groups.some(
                    group => group !== currentGroup && group.groupName === currentName
                )
            ) {
                conflicts.add(currentName)
            }
        }

        return conflicts.size > 0 ? conflicts : undefined
    }

    /**
     * @returns {string}
     */
    toString() {
        let result = ""

        // Import statements.
        this._requires.forEach(req => {
            result += req + "\n"
        })
        result += "\n"

        // Type union declarations.
        this._typeunions.forEach(union => {
            result += union + "\n\n"
        })

        // Table declaration.
        result += this._namespace + " = {\n"
        this._fields.forEach(field => {
            result += `${VirtualFile.INDENT}${field},\n`
        })
        result += "}\n"

        return result
    }

    /**
     * @returns {string}
     */
    static get INDENT() {
        return "    "
    }

    /**
     * @param {VirtualFile} a
     * @param {VirtualFile} b
     * @returns {VirtualFile}
     * @throws {Error} If the "_dir", "_namespace", or "path" properties
     * of the given objects are not equal.
     */
    static merge(a, b) {
        if (a._dir !== b._dir) {
            throw new Error(
                `VirtualFile.merge: a#_dir (${a._dir}) !== b#_dir (${b._dir})`
            )
        }

        if (a._namespace !== b._namespace) {
            throw new Error(
                `VirtualFile.merge: a#_namespace (${a._namespace}) !== b#_namespace (${b._namespace})`
            )
        }

        if (a.path !== b.path) {
            throw new Error(
                `VirtualFile.merge: a#path (${a.path}) !== b#path (${b.path})`
            )
        }

        const result = new VirtualFile({ tableNamespace: a._namespace }, a._dir)
        result._groups = [...a._groups, ...b._groups]
        result._requires = new Set([...a._requires, ...b._requires])
        result._typeunions = new Set([...a._typeunions, ...b._typeunions])
        result._fields = new Set([...a._fields, ...b._fields])

        return result
    }

    /**
     * @param {string} enumeration
     * @param {number} value
     * @returns {string}
     */
    static toField(enumeration, value) {
        return `${enumeration} = ${value}`
    }

    /**
     * @param {string} name The required filename (without its extension).
     * @returns {string}
     */
    static toRequire(name) {
        // XXX: assumes all requirements will be available in the parent directory.
        return `require("../${name}")`
    }

    /**
     * @param {string} name A unique symbol for this type union.
     * @param {Set<string>} fullyQualifiedEnums A list of enumerations including their
     * full table scope, i.e. `smu.ON` rather than `ON`.
     * @return {string}
     */
    static toTypeUnion(name, fullyQualifiedEnums) {
        let result = ["--[[[", `${VirtualFile.INDENT}@typedef {(`, ""].join("\n")

        fullyQualifiedEnums.forEach(fqe => {
            result += VirtualFile.INDENT.repeat(2) + fqe + "|\n"
        })

        result += [`${VirtualFile.INDENT})} ${name}`, "]]"].join("\n")

        return result
    }
}

function main() {
    /** @type {Arguments} */
    const args = Arguments.parse(process.argv.slice(2))
    InstrumentComms.connect(args.instrumentIpv4, args.instrumentPort)
        .then(response => {
            /** @type {Array<RawEnumGroup>} */
            const rawGroups = []

            /** @type {Array<EnumGroup>} */
            const enumGroups = []

            try {
                rawGroups.push(
                    ...response.map(groupString => RawEnumGroup.parse(groupString))
                )
                enumGroups.push(...rawGroups.map(rawGroup => EnumGroup.from(rawGroup)))
            } catch (e) {
                console.error(e.message)
                process.exit(1)
            }

            /** @type {Map<string, VirtualFile>} */
            const files = new Map()

            enumGroups.forEach(enumGroup => {
                if (files.has(enumGroup.tableNamespace)) {
                    const a = files.get(enumGroup.tableNamespace)
                    const b = new VirtualFile(enumGroup, args.outputDir)
                    b.fill()

                    // Merge two VirtualFiles.
                    const merged = VirtualFile.merge(a, b)
                    files.set(enumGroup.tableNamespace, merged)
                } else {
                    const file = new VirtualFile(enumGroup, args.outputDir)
                    file.fill()
                    files.set(enumGroup.tableNamespace, file)
                }
            })

            files.forEach(f => {
                fsExtra.mkdirpSync(path.dirname(f.path))
                fsExtra.writeFileSync(f.path, f.toString(), { encoding: "utf-8" })
                console.log(`-> ${f.path}`) // Warn about any type union name conflicts.
                ;(f.getTypeUnionConflicts() || []).forEach(conflict => {
                    console.warn(
                        `   ${colors.black.bgYellow(
                            "WARN"
                        )} TYPE UNION NAME CONFLICT: ${conflict}`
                    )
                })
            })
        })
        .catch(reason => {
            console.error(reason)
            process.exit(1)
        })
}

main()
