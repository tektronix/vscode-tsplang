require("../string")

--[[[
    Format the given arguments according to the formatstring. The formatstring
    follows a C-like "printf" syntax, with exceptions listed below.

    The flags "*", "l" (lowercase L), "L", "n", "p", and "h" are not
    supported.

    There is an extra flag "q" which escapes the given string argument.

    The flags "c", "d", "e", "E", "f", "g", "G", "i", "o", "u", "x", and "X"
    require a number.

    The flags "q" and "s" require a string.

    @param {string} formatstring
    @param {any} value

    @returns {string}
]]
string.format = function(formatstring, value, ...)
end
