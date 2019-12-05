require("../os")

--[[[
    @typedef {table} TimeInputTable
    @field {number|nil} [hour=nil] 0-23. Defaults to 0 if omitted.
    @field {number|nil} [min=nil] 0-59. Defaults to 0 if omitted.
    @field {number} year In YYYY format.
    @field {number} month 1-12
    @field {number|nil} [sec=nil] 0-61. Defaults to 0 if omitted.
    @field {number} day 1-31
    @field {boolean|nil} [isdst=nil] true if the date represented by the table
        falls within Daylight Savings Time; false otherwise. Defaults to false
        if omitted.
]]

--[[[
    Converts a time table into seconds since January 1, 1970.

    @param {TimeInputTable|nil} [table=nil] The time to convert to epoch time.
        Defaults to `os.date("*t")` if omitted or nil.

    @returns {number} Time in seconds since January 1, 1970.

    @see {@link os.date}
]]
os.time = function(table)
end
