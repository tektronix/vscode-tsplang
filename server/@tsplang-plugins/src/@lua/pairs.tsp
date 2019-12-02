require("./next")

--[[[
    @typedef {table} PairsReturn
    @index {next} The "next" function.
    @index {table} The table passed to the "pairs" function.
    @index {nil} The value nil.
]]

--[[[
    Iterate over key-value pairs of the given table, including any indices.

    Iteration stops when the first nil value is reached.

    To iterate over your table's keys, combine with `for`:
    ```lua
    for k,v in pairs(t) do
        -- ...
    end
    ```

    @param {table} t The table to iterate over.

    @returns {PairsReturn} A list containing the "next" function, the given
        target table, and nil.
]]
function pairs(t)
end
