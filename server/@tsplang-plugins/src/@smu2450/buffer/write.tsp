require("../buffer")

--[[[
    @typedef {(
        buffer.UNIT_AMP
        | buffer.UNIT_VOLT
        | buffer.UNIT_KELVIN
        | buffer.UNIT_OHM)} BufferUnit
]]

buffer.write = {
    --[[[
        TODO

        @param {bufferVar} bufferVar The target buffer.
        @param {BufferUnit} units The units of the buffer (TODO wording).
    ]]
    format = function(bufferVar, units, displayDigits, extraUnits, extraDigits)
    end
}
