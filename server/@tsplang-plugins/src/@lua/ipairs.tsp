
--[[[
    @typedef {table} IteratorReturn
    @index {number|nil} The index of the associated value returned from the
        iterator function. nil if the value returned is also nil.
    @index {any} The value of the index returned from the iterator function.
]]

--[[[
    Traverses all integer fields of a table until a nil value is returned.
    Traversal can start at an arbitrary index.
    @typedef {function} IteratorFunction
    @param {table} table The table to traverse.
    @param {number|nil} index The previous index or nil. If nil, then the
        first index and its associated value are returned.
    @returns {IteratorReturn} The next index-value pair from the given table.
    @see {@link next}
]]

--[[[
    @typedef {table} IPairsReturn
    @index {IteratorFunction} The function used to iterate through the
        returned table.
    @index {table} The table passed to the {@link ipairs} function.
    @index {number} The number 0.
]]

--[[[
    Iterate over index-value pairs of the given table.

    Iteration stops when the first nil value is reached.

    To iterate over your table's indices, combine with `for`:
    ```lua
    for i,v in ipairs(t) do
        -- ...
    end
    ```

    @param {table} t The table to iterate over.

    @returns {IPairsReturn} A list containing an iterator function, the given
        target table, and 0.
]]
function ipairs(t)
end
