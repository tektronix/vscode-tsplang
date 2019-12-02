
--[[[
    @typedef {table} PCallReturn
    @index {boolean} The function exit code. true if no Lua runtime error was
        caught; false otherwise.
    @index {any} The return values of the function passed to "pcall" if the
        exit code is true; otherwise an error message.
]]

--[[[
    Calls the function "f" with the given arguments in protected mode.

    In protected mode, Lua runtime errors are caught and do not propagate
    outside of the given function.

    TSP runtime errors are **not** caught.

    @param {function} f The function to call in protected mode.
    @param {any} [arg=nil] An argument to pass to the given function.

    @returns {PCallReturn} A list containing a boolean exit code followed by
        either an error message or function return values.

    @see {@link xpcall}
]]
function pcall(f, arg, ...)
end
