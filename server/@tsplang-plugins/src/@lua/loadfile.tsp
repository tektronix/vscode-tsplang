
--[[[
    @typedef {table} LoadfileReturnList
    @index {function|nil} The chunk if loading was successful; nil otherwise.
    @index {string|nil} nil if loading was successful; an error message
        otherwise.
]]

--[[[
    Loads a file as a Lua chunk without running it.

    To raise an error while loading, combine with `assert`:
    ```lua
        assert(loadfile(f))()
    ```

    @param {string} filename The target file.

    @returns {LoadfileReturnList} If loaded successfully, then only the chunk
        is returned; otherwise the list contains nil followed by an error
        message.

    @see {@link assert}
]]
function loadfile(filename)
end
