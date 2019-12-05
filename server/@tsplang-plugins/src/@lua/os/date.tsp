require("../os")

--[[[
    @typedef {table} TimeTable
    @field {number} hour 0-23
    @field {number} min 0-59
    @field {number} year In YYYY format.
    @field {number} month 1-12
    @field {number} sec 0-61
    @field {number} day 1-31
    @field {boolean} isdst true if the date represented by the table falls
        within Daylight Savings Time; false otherwise.
]]

--[[[
    Converts the number of time seconds to a string or table based on the
    supplied format and returns the resulting value.

    @param {string|nil} [format=nil] Controls the appearance of the result.
        Defaults to "%c" if omitted or nil.

        If the the given string starts with "!", the the date is formatted in
        Coordinated Universal Time.

        If, after the optional UTC character, the given string is "*t", then
        the current date is returned as a table.

        All other format specifiers will result in a string and follow the
        convention set by the C-language `strftime` function.
    @param {number|nil} [time=nil] The time to use in seconds. Defaults to
        `os.time()` if omitted or nil.

    @returns {string|TimeTable} A string if the table formatter was not
        specified; otherwise a time table.

    @see {@link os.time}
]]
os.date = function(format, time)
end
