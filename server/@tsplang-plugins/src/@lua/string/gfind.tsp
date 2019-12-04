require("../string")

--[[[
    Returns an iterator function that, each time it is called, returns the
    next captures from the pattern over the given string.

    If no captures exist in the pattern, then the whole match is returned each
    call.

    To iterate over all captures, combine with `for`:
    ```lua
    for w in string.gfind("hello world from TSP", "%a+") do
        -- ...
    end
    ```

    @param {string} str The target string.
    @param {string} pattern The pattern to match.

    @returns {function} An iterator function.
]]
string.gfind = function(str, pattern)
end
