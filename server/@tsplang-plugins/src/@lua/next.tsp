
--[[[
    @typedef {table} NextReturn
    @index {any|nil} The key of the associated value returned from the "next"
        function. nil if the value returned is also nil.
    @index {any} The value of the key returned from the "next" function.
]]

--[[[
    Traverses all fields of a table until a nil value is returned. To start
    traversal, omit the index parameter or pass a nil value.

    Traversal can start at an arbitrary key, but only if that key is a number.

    Behavior becomes undefined if, during traversal, a previously empty key is
    modified.

    @param {table} table The table to traverse.
    @param {any} [index=nil] The previous key or nil. If nil, then the
        first key and its associated value is returned.

    @returns {NextReturn} The next key-value pair from the given table.
]]
function next(table, index)
end
