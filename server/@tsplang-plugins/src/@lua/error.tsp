
--[[[
    Terminates the last protected function called and returns `message` as the
    error message. The level argument specifies the call stack location.

    When level is set to 1, the error position is where the error function was
    called. Level 2 points the error to where the function that called error
    was called; and so on.

    @param {string} message A string to display.
    @param {number} [level=1] Stack level of the error location.
]]
function error(message, level)
end
