require("../math")

--[[[
    Calculates the quotient _q_ of dividend _a_ and divisor _n_ such that
    ```
    q = (a/|a|) * (|a|-|n * ⌊|a/n|⌋|)
    ```
    Unless _a_ is ±0 and _n_ is nonzero, in which case _q_ is 0.

    @param {number} dividend
    @param {number} divisor

    @returns {number}
]]
math.mod = function(dividend, divisor)
end
