
require("./rawget")

--[[[
    Sets the value of `table[index]` to the given value, without invoking any
    metamethod.

    @param {table} table The target table.
    @param {NonNil} index The index of the given table.
    @param {any} value The value of `table[index]`.
]]
function rawset(table, index, value)
end
