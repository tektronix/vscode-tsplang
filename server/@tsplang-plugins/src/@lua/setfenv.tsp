
--[[[
    Set the environment to be used by the given function.

    If the original environment has a "__fenv" field, then this function
    raises an error.

    @param {function|number} f A target function or the function at a
        given stack level as a number. Stack level 1 is the function calling
        this function, while level 0 is the global environment.
    @param {table} table The environment of the target function or stack
        level.
]]
function setfenv(f, table)
end
