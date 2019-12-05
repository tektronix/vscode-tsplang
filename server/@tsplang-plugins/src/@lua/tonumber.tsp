
--[[[
    Tries to convert the given value to a number.

    Signed integers are only accepted for base 10.

    @param {any} value The conversion target. Decimals, exponents, and signed
        integers are accepted in base 10. In all other bases, only _unsigned_
        integers are accepted.
    @param {number} [base=10] The base to interpret the given value. Accepts
        any integer between 2 and 36, inclusive.

    @returns {number|nil} The result of the conversion as a number or nil if
        the given value could not be converted.
]]
function tonumber(value, base)
end
