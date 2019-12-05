
--[[[
    Operations related to coroutines and thread objects.

    Unlink threads in multithreaded systems, however, a thread object must
    suspend its execution explicitly by calling {@link coroutine.yield}.

    @see {@link https://www.lua.org/manual/5.0/manual.html#coroutine
        | Lua 5.0 Coroutines}
]]
coroutine = {}
