require("../table")

--[[[
    Inserts the given value at the specified position in the table, shifting
    existing elements as necessary.

    {@link table.setn} is automatically called by this function.

    @param {table} table
    @param {number|nil} position The index at which the given value should be
        inserted. If nil, then the value is appended to the end of the table.
    @param {any} value
]]
table.insert = function(table, position, value)
end
