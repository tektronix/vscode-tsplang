
--[[[
    @typedef {table} GCInfoReturn
    @index {number} The number of kilobytes of dynamic memory TSP is using.
    @index {number} The garbage collection threshold in kilobytes.
]]

--[[[
    Get a list containing garbage collection information. All values are in
    kilobytes.

    @returns {GCInfoReturn} A list containing TSP's memory usage and current
        garbage collection threshold.
]]
function gcinfo()
end
