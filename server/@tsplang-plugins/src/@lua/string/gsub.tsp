require("../string")

--[[[
    Returns a copy of the given string in which all occurences of the pattern
    have been replaced by the specified replacement string. Also returns, as a
    second value, the total number of substitutions made.

    @param {string} str The target string.
    @param {string} pattern The pattern to match.
    @param {string|function} replacement If a string is given, then its value
        is used for replacement. Any sequence of the form _%n_, where _n_ is a
        number between 1 and 9, stands for the value of the _n_-th captured
        substring.

        If a function is given, then it is called every time a match occurs,
        with all captured substrings passed as arguments, in order; if the
        pattern has no captures, then the whole match is passed as the only
        argument. If the value returned by the callback function is a string,
        then it is used as the replacement string; otherwise an empty string
        is used.
    @param {number|nil} [max=nil] The maximum number of substitutions.

    @see {@link https://www.lua.org/manual/5.0/manual.html#pm
        | Lua 5.0 Patterns}

    @description Examples

    ```lua
    x = string.gsub("hello world", "(%w+)", "%1 %1")
    --> x="hello hello world world"

    x = string.gsub("hello world", "(%w+)", "%1 %1", 1)
    --> x="hello hello world"

    x = string.gsub("hello world from Lua", "(%w+)%s*(%w+)", "%2 %1")
    --> x="world hello Lua from"

    x = string.gsub("4+5 = $return 4+5$", "%$(.-)%$", function (s)
            return loadstring(s)()
        end)
    --> x="4+5 = 9"

    local t = {name="lua", version="5.0"}
    x = string.gsub("$name_$version.tar.gz", "%$(%w+)", function (v)
            return t[v]
        end)
    --> x="lua_5.0.tar.gz"
    ```
]]
string.gsub = function(str, pattern, replacement, max)
end
