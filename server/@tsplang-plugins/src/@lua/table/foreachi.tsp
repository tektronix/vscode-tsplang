require("../table")

--[[[
    @typedef {function} ForeachiCallback
    @param {number} index The current table index.
    @param {any} value The value of the given index in the table.
    @returns {any} nil to continue the loop; otherwise the desired return
        value of the foreachi function.
]]

--[[[
    Executes the given function over all indices of the given table.

    If the given function returns a non-nil value, then the loop is broken and
    this value is returned as the final value.

    @param {table} table The table to traverse.
    @param {ForeachiCallback} func The callback function.

    @returns {any} The value returned by the given callback function.
]]
table.foreachi = function(table, func)
end
