
--[[[
    @typedef {function} ErrorHandler
    @param {string} error A caught Lua runtime error.
    @returns {any}
]]

--[[[
    @typedef {table} XPCallReturn
    @index {boolean} The function exit code. true if no Lua runtime error was
        caught; false otherwise.
    @index {any} The return values of the primary function passed to "xpcall"
        if the exit code is true; otherwise the return values of the error
        handler function.
]]

--[[[
    Calls the function "f" in protected mode, using function "errHandler" as
    the error handler.

    In protected mode, Lua runtime errors are caught and do not propagate
    outside of the given function. Instead, errors are passed to the given
    error handler.

    TSP runtime errors are **not** caught nor are they passed to the given
    error handler.

    @param {function} f The function to call in protected mode.
    @param {ErrorHandler} errHandler A callback which handles the caught error
        object.

    @returns {XPCallReturn} A list containing a boolean exit code followed by
        either the return values of function "f" or "errHandler".

    @see {@link pcall}
]]
function xpcall(f, errHandler)
end
