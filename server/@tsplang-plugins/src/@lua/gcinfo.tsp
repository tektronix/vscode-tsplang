--[[
    Get an `inUse, threshold` tuple, where *inUse* is the number of kilobytes
    of dynamic memory TSP is using and *threshold* is the current garbage
    collector threshold in kilobytes.

    @returns {{1: number, 2: number}} Garbage collection information tuple.
]]
function gcinfo()
end
