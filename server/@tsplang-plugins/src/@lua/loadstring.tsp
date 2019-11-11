--[[
    Loads the string as a Lua chunk without running it.

    To raise an error while loading, combine with `assert`:
    ```lua
        assert(loadstring(s))()
    ```

    @param {string} chunkString The string to load.
    @param {?string} chunkName Optional name to use in error messages and debug
        information.

    @returns {{?function, ?string}} If loaded successfully, then only the chunk
        is returned; otherwise the list contains nil followed by an error
        message.

    @see {@link assert}
]]
function loadstring(chunkString, chunkName)
end
