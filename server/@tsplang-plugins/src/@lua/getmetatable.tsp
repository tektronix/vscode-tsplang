
--[[[
    Get the metatable of a given object.

    If the object's metatable has a "__metatable" field, then
    the value of that field is returned.

    @param {table} object The target object.

    @returns {table|nil} The metatable of the target object or nil if the object
        does not have a metatable.
]]
function getmetatable(object)
end
