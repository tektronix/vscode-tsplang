require("../coroutine")

--[[[
    Suspends execution of the current coroutine.

    Cannot yield inside a metamethod or iterator.

    @param {any} [value=nil] An extra value to return with
        {@link coroutine.resume}.
]]
coroutine.yield = function(value, ...)
end
