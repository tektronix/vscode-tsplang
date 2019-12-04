require("../table")

--[[[
    Concatenates all sequential, non-nil values of the given table starting at
    index 1.

    Returns an empty string if the start index is greater than the stop index.

    @param {table} table
    @param {string|nil} [separator=""] The separator to use during
        concatenation.
    @param {number|nil} [start=1] The inclusive starting index.
    @param {number|nil} [stop=-1] The inclusive stopping index.
]]
table.concat = function(table, separator, start, stop)
end
