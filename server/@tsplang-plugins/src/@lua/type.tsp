
--[[[
    @typedef {
        "nil"
        |"number"
        |"string"
        |"boolean"
        |"table"
        |"function"
        |"thread"
        |"userdata"
    } TypeReturn
]]

--[[[
    Return the Lua type of the given value as a string.

    @param {any} value The target of the type operation.

    @returns {TypeReturn} The underlying Lua type of the given value.
]]
function type(value)
end
