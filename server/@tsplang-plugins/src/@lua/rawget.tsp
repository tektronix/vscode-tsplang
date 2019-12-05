
--[[[
    Any value but nil.
    @typedef {
        boolean
        |number
        |string
        |function
        |userdata
        |thread
        |table
    } NonNil
]]

--[[[
    Gets the value of `table[index]`, without invoking any metamethod.

    @param {table} table The target table.
    @param {NonNil} index Anything except nil.

    @returns {any} The value of the given table at the given index.
]]
function rawget(table, index)
end
