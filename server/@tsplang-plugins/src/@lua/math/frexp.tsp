require("../math")

--[[[
    Split the given _x_ into its binary significand and exponent as calculated by
    ```
    x = significant * 2^exponent
    ```

    @param {number} x

    @return {number, number} The absolute value in the interval [0.5, 1)
        followed by the integer exponent of 2.
]]
math.frexp = function(x)
end
