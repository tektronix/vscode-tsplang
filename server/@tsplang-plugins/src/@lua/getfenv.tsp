
--[[[
    Get the current environment in use by the function.

    If the environment has a "__fenv" field, its associated value is returned
    instead of the environment.

    Stack level 1 is the function calling this function.

    @param {function|number} [f=1] A target function or the function at a
        given stack level as a number.

    @returns {table} The environment of the target function or stack level. If
        the given function is not a Lua function, or if f is 0, then the
        global environment is returned.
]]
function getfenv(f)
end
