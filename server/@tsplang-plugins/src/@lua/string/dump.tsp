require("../string")

--[[[
    Get a binary string representation of the given function.

    This binary string can later be passed to {@link loadstring} to return a
    copy of the given function.

    @param {function} func The target function.

    @returns {string} A binary representation of the given function.
]]
string.dump = function(func)
end
