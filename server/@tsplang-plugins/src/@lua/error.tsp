--[[
    Terminates the last protected function called and returns message as the
    error message. The level argument specifies where the error message points
    the error and defaults to 1.

    When level is set to 1, the error position is where the error function was
    called. Level 2 points the error to where the function that called error
    was called; and so on.

    @param {string} message
    @param {number} [level=1]
]]
function error(message, level)
end
