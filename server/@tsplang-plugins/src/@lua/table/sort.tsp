require("../table")

--[[[
    Compares two arguments and returns true if the first argument ought to
    preceed the second argument.
    @typedef {function} SortPredicate
    @param {any} x
    @param {any} y
    @returns {boolean}
]]

--[[[
    Sorts the index-values of the table in-place.

    The sort algorithm is *not* stable for equivalent values.

    @param {table} table
    @param {SortPredicate|nil} [pred=nil] A function that receives two table
        elements and returns true when the first element is less than the
        second. Defaults to using the "<" operator.
]]
table.sort = function(table, pred)
end
