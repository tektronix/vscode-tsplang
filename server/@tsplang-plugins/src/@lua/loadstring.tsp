
--[[[
    @typedef {table} LoadstringReturnList
    @index {function|nil} The chunk if loading was successful; nil otherwise.
    @index {string|nil} nil if loading was successful; an error message
        otherwise.
]]

--[[[
    Loads the string as a Lua chunk without running it.

    To raise an error while loading, combine with {@link assert}:
    ```lua
        assert(loadstring(s))()
    ```

    @param {string} chunkString The string to load.
    @param {string|nil} [chunkName=nil] Optional name to use in error messages and
        debug information.

    @returns {LoadstringReturnList} If loaded successfully, then only the
        chunk is returned; otherwise the list contains nil followed by an
        error message.
]]
function loadstring(chunkString, chunkName)
end
