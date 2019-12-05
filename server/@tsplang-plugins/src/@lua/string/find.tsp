require("../string")

--[[[
    @typedef {table} StringFindReturn
    @index {number|nil} First index of the match.
    @index {number|nil} Last index of the match.
    @index {number|string|nil} Zero or more captures.
]]

--[[[
    Looks for the first match of the given pattern in the string.

    @param {string} str The target string.
    @param {string} pattern The pattern to match.
    @param {number|nil} [start=1] The starting search index.
    @param {boolean|nil} [isPlain=false] Whether to treat the pattern as a
        plain-text substring.

    @returns {StringFindReturn} nil if a match was not found; otherwise the
        starting index of the match, the ending index of the match, and zero
        or more captures.

    @see {@link https://www.lua.org/manual/5.0/manual.html#pm
        | Lua 5.0 Patterns}
]]
string.find = function(str, pattern, start, isPlain)
end
