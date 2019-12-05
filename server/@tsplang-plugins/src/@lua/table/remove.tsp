require("../table")

--[[[
    Removes and returns the element at the specified position from the table,
    shifting remaining elements as necessary.

    {@link table.setn} is automatically called by this function.

    @param {table} table
    @param {number|nil} [position=nil] The target index. Defaults to the last
        index of the table if omitted or nil. Cannot be a negative number.

    @returns {any} The value at the specified position. nil if that position
        is outside the range of the given table or position is negative.
]]
table.insert = function(table, position)
end
