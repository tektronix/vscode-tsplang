#!/usr/bin/env node
const fsExtra = require("fs-extra")
const net = require("net")
const path = require("path")

// #region Type Declarations

/**
 * @typedef {Object} EnumGroup
 * @property {Map<string, number>} enums
 * @property {string} groupName
 * @property {Set<string>} requires
 * @property {string} tableNamespace
 */

 /** */
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

        this._path = path.resolve(
            this._dir,
            this._namespace.replace(".", path.sep)
        )

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
            result += union + "\n"
        })
        result += "\n"

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
        let result = [
            "--[[[",
            `${VirtualFile.INDENT}@typedef {(`,
            "",
        ].join("\n")

        fullyQualifiedEnums.forEach(fqe => {
            result += VirtualFile.INDENT.repeat(2) + fqe + "|\n"
        })

        result += [
            `${VirtualFile.INDENT})} ${name}`,
            "]]",
        ].join("\n")

        return result
    }
}

// #endregion Type Declarations

// #region Process Arguments

const args = process.argv.slice(2)

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
})(args)

// Verify the output directory
let outputDir = args.shift()
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
// // Verify the IPv4 address.
// const ip = args.shift()
// if (ip === undefined) {
//     console.error("Missing IPv4 address argument.")
//     process.exit(2)
// } else {
//     let die = false
//     switch (net.isIPv4(ip)) {
//         case 0:
//             console.error(`Invalid IPv4 address: ${ip}`)
//             die = true
//             break
//         case 6:
//             console.error("IPv6 address are not supported.")
//             die = true
//             break
//         default:
//             break
//     }
//     if (die) process.exit(2)
// }
// // Verify the port (if given).
// /** @type {number|undefined} */
// let port = args.shift()
// if (port !== undefined) {
//     let portNum = Number(port)
//     if (isNaN(portNum)) {
//         console.error(`Invalid port: ${port}`)
//         process.exit(2)
//     } else if (portNum < 1) {
//         console.error(`Port number must be greater than zero: ${port}`)
//         process.exit(2)
//     }
//     port = portNum
// } else {
//     port = 5025
// }

// #endregion Process Arguments

// #region Instrument Communication

// /** @type {Array<string>} */
// const enumTables = []

// const scrape = `
// prevprompts = localnode.prompts;
// if prevprompts == localnode.ENABLE then
//     localnode.prompts = localnode.DISABLE;
// end;

// function make_entry(enum)
//     if enum == nil then return ""; end;

//     if enum["__tostring"] ~= nil then
//         local result = tostring(enum);

//         if enum["__tonumber"] ~= nil then
//             result = result.."\\t"..tostring(tonumber(enum));
//         end;

//         return result.."\\n";
//     end;

//     return "";
// end

// do
//     local mtable = getmetatable(smu.ON);
//     local consecutive_nils = 0;
//     local i = 0;
//     while (i < 16777215) do
//         local enumtable = mtable[i];
//         if enumtable ~= nil then
//             consecutive_nils = 0;
//             local packet = "";

//             local zeroth = enumtable[0];
//             if zeroth ~= nil then
//                 packet = make_entry(zeroth);
//             end;

//             for j,enum in ipairs(enumtable) do
//                 packet = packet..make_entry(enum);
//             end;

//             if packet ~= "" then
//                 print(tostring(i).."\\n"..packet);
//                 delay(0.1);
//             end;
//         else
//             consecutive_nils = consecutive_nils + 1;
//         end;

//         i = i + 1;

//         if consecutive_nils > 1000000 then
//             break;
//         end;
//     end;
// end;

// print("done");

// make_entry = nil;
// localnode.prompts = prevprompts;
// prevprompts = nil;
// `.replace(/\s{2,}|\n/gm, " ")

// const socket = new net.Socket({
//     readable: true,
//     writable: true,
// })

// socket.once("connect", () => {
//     console.log(`Connected to ${ip}:${port}`)
//     socket.write(scrape + "\n")
// })
// socket.on("data", data => {
//     const str = data.toString().trim()
//     console.log(`<- ${str}`)

//     if (str === "done") {
//         if (!socket.destroyed) socket.end()
//     } else {
//         enumTables.push(str)
//     }
// })
// socket.on("error", function(err) {
//     throw err
// })
// socket.once("end", function() {
//     console.log("upload> connection closed")
//     socket.destroy()
//     const groups = GroupParser(enumTables)
// })

// socket.connect(port, ip)

// #endregion Instrument Communication

const instrumentResult = [
    "1\nlocalnode.DISABLE\t0\nlocalnode.ENABLE\t1",
    "2\nformat.ASCII\t1\nformat.REAL32\t2\nformat.REAL64\t3",
    "3\nformat.BIGENDIAN\t0\nformat.LITTLEENDIAN\t1",
    "4\nbuffer.UNIT_VOLT\t0\nbuffer.UNIT_AMP\t1\nbuffer.UNIT_OHM\t2\nbuffer.UNIT_WATT\t3\nbuffer.UNIT_DECIBEL\t4\nbuffer.UNIT_KELVIN\t5\nbuffer.UNIT_CELSIUS\t6\nbuffer.UNIT_FAHRENHEIT\t7\nbuffer.UNIT_FARAD\t8\nbuffer.UNIT_HERTZ\t9\nbuffer.UNIT_SECOND\t10\nbuffer.UNIT_RATIO\t11\nbuffer.UNIT_VOLT_AC\t12\nbuffer.UNIT_AMP_AC\t13\nbuffer.UNIT_CUSTOM1\t14\nbuffer.UNIT_PERCENT\t15\nbuffer.UNIT_RECIPROCAL\t16\nbuffer.UNIT_TOT\t17\nbuffer.UNIT_DIO\t18\nbuffer.UNIT_DAC\t19\nbuffer.UNIT_DBM\t20\nbuffer.UNIT_CUSTOM2\t21\nbuffer.UNIT_CUSTOM3\t22\nbuffer.UNIT_NONE\t23",
    "5\nbuffer.EXPR_OFF\t0\nbuffer.EXPR_NONE\t1\nbuffer.EXPR_SQROOT\t2\nbuffer.EXPR_POLY\t3\nbuffer.EXPR_RECIPROCAL\t4\nbuffer.EXPR_POWER\t5\nbuffer.EXPR_EXPONENT\t6\nbuffer.EXPR_LOG10\t7\nbuffer.EXPR_RATE\t8\nbuffer.EXPR_SERIES_AVERAGE\t9\nbuffer.EXPR_SERIES_MAX\t10\nbuffer.EXPR_SERIES_MIN\t11\nbuffer.EXPR_INTEGRAL\t12\nbuffer.EXPR_AVERAGE\t13\nbuffer.EXPR_ADD\t14\nbuffer.EXPR_SUBTRACT\t15\nbuffer.EXPR_MULTIPLY\t16\nbuffer.EXPR_DIVIDE\t17\nbuffer.EXPR_PERCENT\t18",
    "6\nbuffer.DIGITS_3_5\t0\nbuffer.DIGITS_4_5\t1\nbuffer.DIGITS_5_5\t2\nbuffer.DIGITS_6_5\t3\nbuffer.DIGITS_7_5\t4\nbuffer.DIGITS_8_5\t5",
    "7\nbuffer.STYLE_STANDARD\t0\nbuffer.STYLE_COMPACT\t1\nbuffer.STYLE_FULL\t2\nbuffer.STYLE_READING_ONLY\t3\nbuffer.STYLE_WRITABLE\t4\nbuffer.STYLE_WRITABLE_FULL\t5",
    "8\ntrigger.EVENT_NONE\t0\ntrigger.EVENT_DIGIO1\t1\ntrigger.EVENT_DIGIO2\t2\ntrigger.EVENT_DIGIO3\t3\ntrigger.EVENT_DIGIO4\t4\ntrigger.EVENT_DIGIO5\t5\ntrigger.EVENT_DIGIO6\t6\ntrigger.EVENT_TSPLINK1\t7\ntrigger.EVENT_TSPLINK2\t8\ntrigger.EVENT_TSPLINK3\t9\ntrigger.EVENT_TIMER1\t10\ntrigger.EVENT_TIMER2\t11\ntrigger.EVENT_TIMER3\t12\ntrigger.EVENT_TIMER4\t13\ntrigger.EVENT_NOTIFY1\t14\ntrigger.EVENT_NOTIFY2\t15\ntrigger.EVENT_NOTIFY3\t16\ntrigger.EVENT_NOTIFY4\t17\ntrigger.EVENT_NOTIFY5\t18\ntrigger.EVENT_NOTIFY6\t19\ntrigger.EVENT_NOTIFY7\t20\ntrigger.EVENT_NOTIFY8\t21",
    "9\ntrigger.OFF\t0\ntrigger.ON\t1",
    "10\nlocalnode.ACCESS_FULL\t0\nlocalnode.ACCESS_EXCLUSIVE\t1\nlocalnode.ACCESS_PROTECTED\t2\nlocalnode.ACCESS_LOCKOUT\t3",
    "11\nlocalnode.DISPLAY_LOCK\t0\nlocalnode.DISPLAY_RELEASE\t1\nlocalnode.DISPLAY_PROTECT\t2",
    "12\ntrigger.CONT_OFF\t0\ntrigger.CONT_AUTO\t1\ntrigger.CONT_RESTART\t2",
    "16\ndisplay.OFF\t0\ndisplay.ON\t1",
    "18\ndisplay.FORMAT_PREFIX\t0\ndisplay.FORMAT_EXPONENT\t1",
    "19\ndisplay.STATE_BLACKOUT\t0\ndisplay.STATE_LCD_OFF\t1\ndisplay.STATE_LCD_25\t2\ndisplay.STATE_LCD_50\t3\ndisplay.STATE_LCD_75\t4\ndisplay.STATE_LCD_100\t5",
    "20\ndisplay.TYPE_NONE\t0\ndisplay.TYPE_SCREEN\t1\ndisplay.TYPE_VIRTUAL\t2\ndisplay.TYPE_BOTH\t3",
    "21\ndisplay.ORIENT_HORZ\t0\ndisplay.ORIENT_VERT\t1",
    "22\ndisplay.FILL_LEFT\t0\ndisplay.FILL_RIGHT\t1\ndisplay.FILL_UP\t2\ndisplay.FILL_DOWN\t3",
    "24\ndisplay.OBJ_TEXT\t1\ndisplay.OBJ_RECT\t2\ndisplay.OBJ_LINE\t3\ndisplay.OBJ_CIRCLE\t4\ndisplay.OBJ_IMAGE\t5\ndisplay.OBJ_BUTTON\t6\ndisplay.OBJ_BUTTON_MENU\t7\ndisplay.OBJ_EDIT_NUMBER\t8\ndisplay.OBJ_EDIT_OPTION\t9\ndisplay.OBJ_EDIT_STRING\t10\ndisplay.OBJ_EDIT_CHECK\t11\ndisplay.OBJ_EDIT_SLIDER\t12",
    "25\ndisplay.MARK_GREEN\t0\ndisplay.MARK_YELLOW\t1\ndisplay.MARK_RED\t2",
    "26\ndisplay.BUTTON_SELF\t0\ndisplay.BUTTON_OK\t1\ndisplay.BUTTON_CANCEL\t2\ndisplay.BUTTON_YES\t3\ndisplay.BUTTON_NO\t4\ndisplay.BUTTON_OPTION1\t5\ndisplay.BUTTON_OPTION2\t6\ndisplay.BUTTON_OPTION3\t7\ndisplay.BUTTON_OPTION4\t8\ndisplay.BUTTON_OPTION5\t9\ndisplay.BUTTON_OPTION6\t10\ndisplay.BUTTON_OPTION7\t11\ndisplay.BUTTON_OPTION8\t12\ndisplay.BUTTON_OPTION9\t13\ndisplay.BUTTON_OPTION10\t14",
    "27\ndisplay.BUTTONS_NONE\t0\ndisplay.BUTTONS_OK\t1\ndisplay.BUTTONS_CANCEL\t2\ndisplay.BUTTONS_OKCANCEL\t3\ndisplay.BUTTONS_YESNO\t4\ndisplay.BUTTONS_YESNOCANCEL\t5",
    "28\ndisplay.SFORMAT_ANY\t0\ndisplay.SFORMAT_UPPER_LOWER\t1\ndisplay.SFORMAT_UPPER\t2\ndisplay.SFORMAT_BUFFER_NAME\t3\ndisplay.SFORMAT_FILE_NAME\t4\ndisplay.SFORMAT_IP_ADDRESS\t5",
    "29\ndisplay.ELEMENT_DATA\t0\ndisplay.ELEMENT_TIME\t1\ndisplay.ELEMENT_SOURCE\t2",
    "30\ndisplay.STATE_ENABLE\t0\ndisplay.STATE_DISABLE\t1\ndisplay.STATE_READONLY\t2\ndisplay.STATE_INVISIBLE\t3",
    "31\ndisplay.STYLE_LINE\t0\ndisplay.STYLE_MARKER\t1\ndisplay.STYLE_BOTH\t2",
    "32\ndisplay.EVENT_PRESS\t1\ndisplay.EVENT_SCALE\t2",
    "33\ndisplay.FONT_SMALL\t0\ndisplay.FONT_MEDIUM\t1\ndisplay.FONT_LARGE\t2\ndisplay.FONT_HUGE\t3\ndisplay.FONT_1\t4\ndisplay.FONT_2\t5\ndisplay.FONT_3\t6\ndisplay.FONT_4\t7\ndisplay.FONT_5\t8\ndisplay.FONT_6\t9\ndisplay.FONT_7\t10\ndisplay.FONT_8\t11\ndisplay.FONT_9\t12\ndisplay.FONT_10\t13",
    "34\ndisplay.XSCALE_SMART\t0\ndisplay.XSCALE_LATEST\t1\ndisplay.XSCALE_GROUP\t2\ndisplay.XSCALE_ALL\t3\ndisplay.XSCALE_AUTOBIN\t4\ndisplay.XSCALE_SWIM\t5\ndisplay.XSCALE_SHARED\t6\ndisplay.XSCALE_OFF\t7",
    "35\ndisplay.AXIS_NORMAL\t0\ndisplay.AXIS_LOG\t1",
    "36\ndisplay.YSCALE_SMART\t0\ndisplay.YSCALE_ALL\t1\ndisplay.YSCALE_PER_TRACE_ONCE\t2\ndisplay.YSCALE_SWIM\t3\ndisplay.YSCALE_SHARED\t4\ndisplay.YSCALE_OFF\t5",
    "37\ndisplay.CURSOR_VERTICAL\t1\ndisplay.CURSOR_HORIZONTAL\t2\ndisplay.CURSOR_TRIGGER\t3",
    "38\nki.display.ACTION_PRESS_HOME\t1\nki.display.ACTION_PRESS_MENU\t2\nki.display.ACTION_PRESS_QUICKSET\t3\nki.display.ACTION_PRESS_HELP\t4\nki.display.ACTION_PRESS_ENTER\t5\nki.display.ACTION_PRESS_EXIT\t6\nki.display.ACTION_PRESS_FUNCTION\t7\nki.display.ACTION_PRESS_TRIGGER\t8\nki.display.ACTION_PRESS_FRONTREAR\t9\nki.display.ACTION_PRESS_OUTPUT\t10\nki.display.ACTION_RELEASE_HOME\t11\nki.display.ACTION_RELEASE_MENU\t12\nki.display.ACTION_RELEASE_QUICKSET\t13\nki.display.ACTION_RELEASE_HELP\t14\nki.display.ACTION_RELEASE_ENTER\t15\nki.display.ACTION_RELEASE_EXIT\t16\nki.display.ACTION_RELEASE_FUNCTION\t17\nki.display.ACTION_RELEASE_TRIGGER\t18\nki.display.ACTION_RELEASE_FRONTREAR\t19\nki.display.ACTION_RELEASE_OUTPUT\t20\nki.display.ACTION_KNOB_LEFT\t21\nki.display.ACTION_KNOB_RIGHT\t22",
    "39\ndisplay.DUMP_NONE\t0\ndisplay.DUMP_LIST\t1\ndisplay.DUMP_BRIEF\t2\ndisplay.DUMP_ALL\t3",
    "40\ntrigger.BLOCK_NOP\t0",
    "41\ntrigger.STATE_EMPTY\t0\ntrigger.STATE_BUILDING\t1\ntrigger.STATE_IDLE\t2\ntrigger.STATE_RUNNING\t3\ntrigger.STATE_WAITING\t4\ntrigger.STATE_FAILED\t5\ntrigger.STATE_ABORTING\t6\ntrigger.STATE_ABORTED\t7\ntrigger.STATE_PAUSED\t8",
    "42\ntrigger.READING_MEASURE\t1\ntrigger.READING_DIGITIZE\t2\ntrigger.READING_ACTIVE\t3",
    "43\ntrigger.EDGE_FALLING\t0\ntrigger.EDGE_RISING\t1\ntrigger.EDGE_EITHER\t2",
    "44\ntrigger.LOGIC_NEGATIVE\t0\ntrigger.LOGIC_POSITIVE\t1",
    "47\ndigio.STATE_LOW\t0\ndigio.STATE_HIGH\t1",
    "48\ntsplink.STATE_LOW\t0\ntsplink.STATE_HIGH\t1",
    "49\nsmu.OFF\t0\nsmu.ON\t1",
    "50\nsmu.FILTER_MOVING_AVG\t0\nsmu.FILTER_REPEAT_AVG\t1",
    "51\nsmu.FUNC_DC_VOLTAGE\t0\nsmu.FUNC_DC_CURRENT\t1\nsmu.FUNC_RESISTANCE\t2",
    "52\nsmu.DIGITS_3_5\t0\nsmu.DIGITS_4_5\t1\nsmu.DIGITS_5_5\t2\nsmu.DIGITS_6_5\t3",
    "53\nsmu.GUARD_CABLE\t0\nsmu.GUARD_OHMS\t1",
    "54\nsmu.MATH_MXB\t1\nsmu.MATH_PERCENT\t2\nsmu.MATH_RECIPROCAL\t3",
    "55\nsmu.OFFMODE_HIGHZ\t0\nsmu.OFFMODE_NORMAL\t1\nsmu.OFFMODE_ZERO\t2\nsmu.OFFMODE_GUARD\t3",
    "56\nsmu.SENSE_2WIRE\t0\nsmu.SENSE_4WIRE\t1",
    "57\nsmu.TERMINALS_REAR\t0\nsmu.TERMINALS_FRONT\t1",
    "58\nsmu.FAIL_NONE\t0\nsmu.FAIL_LOW\t1\nsmu.FAIL_HIGH\t2\nsmu.FAIL_BOTH\t3",
    "59\nsmu.UNIT_VOLT\t0\nsmu.UNIT_AMP\t1\nsmu.UNIT_OHM\t2\nsmu.UNIT_WATT\t3",
    "60\nsmu.PROTECT_2V\t0\nsmu.PROTECT_5V\t1\nsmu.PROTECT_10V\t2\nsmu.PROTECT_20V\t3\nsmu.PROTECT_40V\t4\nsmu.PROTECT_60V\t5\nsmu.PROTECT_80V\t6\nsmu.PROTECT_NONE\t7",
    "61\nsmu.THRESHOLD_2_OHM\t0\nsmu.THRESHOLD_15_OHM\t1\nsmu.THRESHOLD_50_OHM\t2",
    "62\nsmu.FASTRANGE_OFF\t0\nsmu.FASTRANGE_ON\t1\nsmu.FASTRANGE_PERSIST\t2",
    "63\nsmu.ATTR_MEAS_AUTO_ZERO\t0\nsmu.ATTR_MEAS_DIGITS\t1\nsmu.ATTR_MEAS_FILTER_ENABLE\t2\nsmu.ATTR_MEAS_FILTER_TYPE\t3\nsmu.ATTR_MEAS_FILTER_COUNT\t4\nsmu.ATTR_MEAS_FUNCTION\t5\nsmu.ATTR_MEAS_MATH_ENABLE\t6\nsmu.ATTR_MEAS_MATH_FORMAT\t7\nsmu.ATTR_MEAS_MATH_PERCENT\t8\nsmu.ATTR_MEAS_MATH_MXB_MF\t9\nsmu.ATTR_MEAS_MATH_MXB_BF\t10\nsmu.ATTR_MEAS_NPLC\t11\nsmu.ATTR_MEAS_OFFSET_COMP\t12\nsmu.ATTR_MEAS_RANGE\t13\nsmu.ATTR_MEAS_RANGE_AUTO\t14\nsmu.ATTR_MEAS_RANGE_REBOUND\t15\nsmu.ATTR_MEAS_RANGE_LOW\t16\nsmu.ATTR_MEAS_RANGE_HIGH\t17\nsmu.ATTR_MEAS_REL_ENABLE\t18\nsmu.ATTR_MEAS_REL_LEVEL\t19\nsmu.ATTR_MEAS_SENSE\t20\nsmu.ATTR_MEAS_TERMINALS\t21\nsmu.ATTR_MEAS_UNIT\t22",
    "65\nsmu.RANGE_AUTO\t0\nsmu.RANGE_FIXED\t1\nsmu.RANGE_BEST\t2",
    "66\nsmu.AUDIBLE_NONE\t0\nsmu.AUDIBLE_FAIL\t1\nsmu.AUDIBLE_PASS\t2",
    "67\nfile.MODE_APPEND\t0\nfile.MODE_READ\t1\nfile.MODE_WRITE\t2",
    "68\nfile.READ_LINE\t0\nfile.READ_NUMBER\t1\nfile.READ_ALL\t2",
    "69\ntspnet.TERM_LF\t1\ntspnet.TERM_CRLF\t2\ntspnet.TERM_LFCR\t3\ntspnet.TERM_CR\t4",
    "70\nlan.MODE_AUTO\t0\nlan.MODE_MANUAL\t1",
    "71\nlan.PROTOCOL_TCP\t0\nlan.PROTOCOL_UDP\t1\nlan.PROTOCOL_MULTICAST\t2",
    "72\ndisplay.JUST_LEFT\t0\ndisplay.JUST_RIGHT\t1\ndisplay.JUST_CENTER\t2",
    "73\ntrigger.WAIT_AND\t0\ntrigger.WAIT_OR\t1",
    "74\ntrigger.CLEAR_NEVER\t0\ntrigger.CLEAR_ENTER\t1",
    "75\ntrigger.USER_DELAY_M1\t0\ntrigger.USER_DELAY_M2\t1\ntrigger.USER_DELAY_M3\t2\ntrigger.USER_DELAY_M4\t3\ntrigger.USER_DELAY_M5\t4\ntrigger.USER_DELAY_S1\t5\ntrigger.USER_DELAY_S2\t6\ntrigger.USER_DELAY_S3\t7\ntrigger.USER_DELAY_S4\t8\ntrigger.USER_DELAY_S5\t9",
    "76\ntrigger.LIMIT_INSIDE\t0\ntrigger.LIMIT_ABOVE\t1\ntrigger.LIMIT_BELOW\t2\ntrigger.LIMIT_OUTSIDE\t3",
]

const groups = GroupParser(instrumentResult)



/** @type {Map<string, VirtualFile>} */
const files = new Map()

groups.forEach(group => {
    if (files.has(group.tableNamespace)) {
        // Merge two groups that reside in the same file.
        const a = files.get(group.tableNamespace)
        // TODO: the merge messes up a bit...
        console.log("merging")
        const merged = VirtualFile.merge(a, new VirtualFile(group, outputDir))
        files.set(group.tableNamespace, merged)
    } else {
        const file = new VirtualFile(group, outputDir)
        file.fill()
        files.set(group.tableNamespace, file)
    }
})

// files.forEach(f => {
//     fsExtra.mkdirpSync(path.dirname(f.path))
//     fsExtra.writeFileSync(f.path, f.toString(), { encoding: "utf-8" })
//     console.log(`-> ${f.path}`)
// })

/**
 * Convert enumeration group strings into EnumGroups.
 * @param {Array<string>} enums
 * @returns {Array<EnumGroup>}
 */
function GroupParser(enums) {
    console.log(`<- ${enums.length} groups from instrument`)

    /**
     * Converts a string to PascalCase.
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

    /** @type {Array<EnumGroup>} */
    const results = []

    /* Enum group string take the form:
     *
     *  <Group Number>\n
     *  <Fully-Qualified Enum>\t<Enum Backing Value>\n
     *      ...
     *  <Fully-Qualified Enum>\t<Enum Backing Value>\n
     */

    for (let enumGroupString of enums) {
        const entries = enumGroupString.split("\n")

        if (isNaN(Number(entries.shift()))) {
            console.error(`Malformed enum group string: ${enumGroupString}`)
            console.error("Expected first entry to be a group number.")
            process.exit(1)
        }

        /** @type {string} */
        let groupNamePrefix
        /** @type {Set<string>} */
        const groupNameParts = new Set()

        /** @type {EnumGroup} */
        const enumEntry = {
            enums: new Map(),
            requires: new Set(),
        }

        for (let row of entries) {
            const columns = row.split("\t")

            const EXPECTED_COLUMNS = 2
            if (columns.length !== EXPECTED_COLUMNS) {
                console.error("Unexpected number of enum entry elements.")
                console.error(
                    `Expected ${EXPECTED_COLUMNS} columns, found ${columns.length}`
                )
                process.exit(1)
            }

            const fullyQualifiedEnum = columns.shift()
            if (fullyQualifiedEnum.split(".").length < 2) {
                console.error(`Unexpectedly shaped enum: ${fullyQualifiedEnum}`)
                process.exit(1)
            }

            const enumBackingValue = columns.shift()
            const enumValue = Number(enumBackingValue)
            if (isNaN(enumValue)) {
                console.error("Unknown type of backing value.")
                console.error(`Expected a number, found ${enumBackingValue}`)
            }

            const enumNameStart = fullyQualifiedEnum.lastIndexOf(".") + 1

            // Validate this enum's table namespace against the other group members
            // or save this enum's table namespace.
            const tableNamespace = fullyQualifiedEnum.slice(0, enumNameStart - 1)
            if (
                enumEntry.tableNamespace !== undefined &&
                enumEntry.tableNamespace !== tableNamespace
            ) {
                console.error("Table namespace failed to match group members")
                console.error(
                    `Expected "${enumEntry.tableNamespace}", found ${tableNamespace}`
                )
                process.exit(1)
            } else {
                enumEntry.tableNamespace = tableNamespace

                // Create the group name prefix from the table namespace.
                if (groupNamePrefix === undefined) {
                    groupNamePrefix = ""
                    tableNamespace.split(".").forEach(tableName => {
                        groupNamePrefix += toPascalCase(tableName)
                    })
                    // If nothing was added, then revert to undefined so we can fail later.
                    if (groupNamePrefix === "") groupNamePrefix = undefined
                }

                // Record import requirements for this table namespace.
                const tableNames = tableNamespace.split(".")
                // Remove the first name until we have 2 names left.
                while (tableNames.length > 2) {
                    tableNames.shift()
                }
                // Only subtables need an import statement.
                // (Root tables would have a length of 1.)
                if (tableNames.length === 2) {
                    // We only need the parent of our subtable.
                    enumEntry.requires.add(tableNames.shift())
                }
            }

            const enumName = fullyQualifiedEnum.slice(enumNameStart)

            groupNameParts.add(toPascalCase(enumName))

            if (enumEntry.enums.has(enumName)) {
                // If we have already recorded this enum, then validate its value.
                const recordedValue = enumEntry.enums.get(enumName)
                if (recordedValue !== enumValue) {
                    console.error("Unexpected enum value change.")
                    console.error(
                        `Enum "${enumName}" was "${recordedValue}", now "${enumValue}"`
                    )
                    console.dir(enumGroupString)
                    process.exit(1)
                }
            } else {
                enumEntry.enums.set(enumName, enumValue)
            }
        }

        // Construct the group name.
        {
            enumEntry.groupName = groupNamePrefix !== undefined ? groupNamePrefix : ""

            const haveUnderscores = Array.from(groupNameParts.values()).filter(n =>
                n.includes("_")
            )
            if (haveUnderscores.length > 0) {
                if (haveUnderscores < groupNameParts.size) {
                    console.error("Did not expect enums with AND without underscores.")
                    console.dir(enumGroupString)
                    process.exit(1)
                }

                const enumTypeStrings = new Set(
                    haveUnderscores.map(n => n.slice(0, n.indexOf("_")))
                )
                if (enumTypeStrings.size > 1) {
                    console.error("Found multiple pre-underscore substring values:")
                    console.error(...Array.from(enumTypeStrings.values()))
                    process.exit(1)
                }

                enumEntry.groupName += toPascalCase(
                    Array.from(enumTypeStrings.values())[0]
                )
            } else {
                groupNameParts.forEach(n => (enumEntry.groupName += toPascalCase(n)))
            }
        }

        // Validate the construction of this enum entry.
        if (
            enumEntry.enums.size === 0 ||
            enumEntry.groupName === undefined ||
            enumEntry.requires.length === 0 ||
            enumEntry.tableNamespace === undefined
        ) {
            console.error(
                `Failed to construct a valid enum entry for:\n${enumGroupString}\n`
            )
            console.error("Resulting enum entry:")
            console.dir(enumEntry)
            process.exit(1)
        }

        // Look for group name conflicts.
        for (let group of results) {
            if (
                group.tableNamespace === enumEntry.tableNamespace &&
                group.groupName === enumEntry.groupName
            ) {
                console.warn(
                    `Group name conflict for "${enumEntry.tableNamespace}.${enumEntry.groupName}"`
                )
                // Break so we do not repeat conflict warnings.
                break
            }
        }

        results.push(enumEntry)
    }

    return results
}
