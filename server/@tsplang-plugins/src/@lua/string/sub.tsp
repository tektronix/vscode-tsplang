require("../string")

--[[[
    Get the substring from the start index through the stop index. Both
    indices are inclusive.

    If omitted or nil, then the stop index is -1.

    @param {string} str The target string.
    @param {number} start The inclusive starting index.
    @param {number|nil} [stop=-1] The inclusive stopping index.

    @returns {string} A substring of the given string.
]]
string.sub = function(str, start, stop)
end
