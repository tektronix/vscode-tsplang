
--[[[
    Sets the garbage-collection threshold to the given limit (in Kbytes) and
    checks it against the byte counter. If the new threshold is smaller than
    the byte counter, then Lua immediately runs the garbage collector. If
    limit is absent, it defaults to zero (thus forcing a garbage-collection
    cycle).

    @param {number} limit Garbage collection threshold in kilobytes.
]]
function collectgarbage(limit)
end
