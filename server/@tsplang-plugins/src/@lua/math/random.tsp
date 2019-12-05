require("../math")

--[[[
    Get a pseudo-random number.

    When called without arguments, this value is in the interval [0, 1).

    When only _x_ is specified, then the interval is [1, x].

    When both _x_ and _y_ are specified, then the interval is [x, y].

    @param {number} [x=nil]
    @param {number} [y=nil]

    @returns {number} A pseudo-random number.
]]
math.random = function(x, y)
end
