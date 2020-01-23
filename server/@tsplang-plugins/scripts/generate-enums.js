#!/usr/bin/env node
const fsExtra = require("fs-extra");
const net = require("net");
const path = require("path");

// #region Process Arguments

const args = process.argv.slice(2);

// Print help and exit if the flag is present in the given arguments.
(function(cmdlineArgs) {
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
                        ""
                    ].join("\n")
                );
                process.exit(0);
            default:
                break;
        }
    });
})(args);

// Verify the output directory
const outputDir = path.resolve(path.normalize(args.shift()));
if (outputDir === undefined) {
    console.error("Missing output directory argument.")
    process.exit(2)
} else if (!fsExtra.pathExistsSync(outputDir)) {
    console.error(`Path does not exist: ${outputDir}`);
    process.exit(2);
} else if (!fsExtra.statSync(outputDir).isDirectory()) {
    console.error(`Path is not a directory: ${outputDir}`);
    process.exit(2);
}
// Verify the IPv4 address.
const ip = args.shift();
if (ip === undefined) {
    console.error("Missing IPv4 address argument.");
    process.exit(2);
} else {
    let die = false;
    switch (net.isIPv4(ip)) {
        case 0:
            console.error(`Invalid IPv4 address: ${ip}`);
            die = true;
            break;
        case 6:
            console.error("IPv6 address are not supported.")
            die = true;
            break;
        default:
            break;
    }
    if (die) process.exit(2);
}
// Verify the port (if given).
/** @type {number|undefined} */
let port = args.shift();
if (port !== undefined) {
    let portNum = Number(port);
    if (isNaN(portNum)) {
        console.error(`Invalid port: ${port}`);
        process.exit(2);
    } else if (portNum < 1) {
        console.error(`Port number must be greater than zero: ${port}`);
        process.exit(2);
    }
    port = portNum;
} else {
    port = 5025;
}

// #endregion Process Arguments

// #region Instrument Communication

/** @type {Set<string>} */
const enums = new Set();

const scrape = `
prevprompts = localnode.prompts;
if prevprompts == localnode.ENABLE then
    localnode.prompts = localnode.DISABLE;
end;

do
    local mtable = getmetatable(smu.ON);
    local consecutive_nils = 0;
    local i = 0;
    while (i < 16777215) do
        local enumtable = mtable[i];
        if enumtable ~= nil then
            consecutive_nils = 0;
            local packet = "";

            local zeroth = enumtable[0];
            if zeroth ~= nil then
                packet = tostring(zeroth).."\\n";
            end;

            for j,enum in ipairs(enumtable) do
                packet = packet..tostring(enum).."\\n";
            end;

            if packet ~= "" then
                print(packet);
                delay(0.1);
            end;
        else
            consecutive_nils = consecutive_nils + 1;
        end;

        i = i + 1;

        if consecutive_nils > 1000000 then
            break;
        end;
    end;
end;

print("done");

localnode.prompts = prevprompts;
`.replace(/\s{2,}|\n/gm, " ");

const socket = new net.Socket({
    readable: true,
    writable: true,
});

socket.once("connect", () => {
    console.log(`Connected to ${ip}:${port}`);
    socket.write(scrape + "\n");
});
socket.on("data", (data) => {
    const str = data.toString().trim();
    console.log(`<- ${str}`);

    str.split("\n").forEach((value) => {
        if (value !== "done") enums.add(value);
    });
    if (str.includes("done")) {
        if (!socket.destroyed) socket.end();
    }
});
socket.on("error", function(err) {
    throw err;
});
socket.once("end", function() {
    console.log("upload> connection closed");
    socket.destroy();
    FileMaker(enums);
});

socket.connect(port, ip);

// #endregion Instrument Communication

/**
 * Generate enumeration completions.
 * @param {Set<string>} enums
 * @returns {void}
 */
function FileMaker(enums) {
    console.log(`FileMaker> Received ${enums.size} unique items from instrument`);

    console.dir(enums);
}
