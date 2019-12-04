require("../table")

--[[[
    @typedef {function} ForeachCallback
    @param {any} key The current table field.
    @param {any} value The value of the given key in the table.
    @returns {any} nil to continue the loop; otherwise the desired return
        value of the foreach function.
]]

--[[[
    Executes the given function over all elements of the given table.

    If the given function returns a non-nil value, then the loop is broken and
    this value is returned as the final value.

    @param {table} table The table to traverse.
    @param {ForeachCallback} func The callback function.

    @returns {any} The value returned by the given callback function.
]]
table.foreach = function(table, func)
end
