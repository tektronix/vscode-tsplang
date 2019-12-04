require("../table")

--[[[
    Gets the size of the given table. A table's size is one less than the
    first integer index with a nil value, unless one of the below conditions
    are met.

    If the table has a field "n" with a numeric value, then this value is
    returned.

    If {@link table.setn} has been called on the given table, then that value
    is returned.

    @param {table} table

    @returns {number}
]]
table.getn = function(table)
end
