require("../coroutine")

--[[[
    Creates a new coroutine as a function whose body is the given function.

    The returned function automatically resumes the body each time it is
    called. Any arguments passed to the returned coroutine function behave
    like those passed to a typical {@link coroutine.resume} call. Its return
    values are those passed to the {@link coroutine.yield} function by the
    coroutine body but are not preceeded by an error status boolean.

    All Lua runtime errors from the given function will propagate.

    @param {function} f The coroutine body.

    @returns {function} A thread-like function.
]]
coroutine.wrap = function(f)
end
