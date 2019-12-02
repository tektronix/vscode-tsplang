
--[[[
    Sets the metatable of the given table (unless the given table represents
    userdata).

    If the original table has a "__metatable" field, then this function raises
    an error.

    @param {table} table The target table.
    @param {table|nil} metatable The table to use as the given table's
        metatable. If nil, then the given table's metatable is removed.
]]
function setmetatable(table, metatable)
end
