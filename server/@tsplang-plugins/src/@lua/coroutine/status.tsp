require("../coroutine")

--[[[
    @typedef {
        "running"
        |"suspended"
        |"dead"
    } CoroutineStatusReturn
]]

--[[[
    Returns the status of the given coroutine.

    @param {thread} co The target thread object.

    @returns {CoroutineStatusReturn} `"running"` if the coroutine requested
        its own status, `"suspended"` if the coroutine called yield, or
        `"dead"` if the body of the coroutine has finished or an error
        occurred.
]]
coroutine.status = function(co)
end
