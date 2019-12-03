require("../coroutine")

--[[[
    @typedef {table} CoroutineResumeReturn
    @index {boolean} The error status. true if the coroutine ran without any
        errors; otherwise false followed by the error message.
    @index {any} Zero or more values passed to the {@link coroutine.yield}
        function if the error status is true; otherwise an error message
        string.
]]

--[[[
    Starts the execution of the given coroutine or resumes its execution from
    the last yield call.

    @param {thread} co The thread object to run.
    @param {any} [any=nil] Arguments to pass to the function body of the
        thread object.

    @returns {CoroutineResumeReturn} A status boolean followed by the values
        passed to the {@link coroutine.yield} function or an error message.
]]
coroutine.resume = function(co, arg, ...)
end
