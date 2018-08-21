/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const bufferCompletions: Array<CompletionItem> = [
    {
        detail: 'This function sets a math expression on a channel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.channelmath',
    },
    {
        detail: 'This function clears the statistical information associated with the specified buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command clears the statistics without clearing the readings.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.clearstats',
    },
    {
        detail: 'This function deletes a user-defined reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You cannot delete the default reading buffers, defbuffer1 and defbuffer2.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.delete',
    },
    {
        detail: 'This function returns statistics from a specified reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function returns a table with statistical data about the data that was placed in the reading buffer.\n\nThe instrument automatically updates reading buffer statistics as data is added to the reading buffer.\n\nWhen the reading buffer is configured to fill continuously and overwrite old data with new data, the buffer statistics include the data that was overwritten. To get statistics that do not include data that has been overwritten, define a large buffer size that will accommodate the number of readings you will make.\n\nThe table returned from this function provides statistics at the time the function is called. Although the instrument continues to update the statistics, the table that is returned is not updated. To get fresh statistics, call this function again.\n\nThe statsVar parameter contains the values described in the following table.\n\nIf n equals zero (0), all other values are nil. If n equals 1, stddev is nil because the standard deviation of a sample size of 1 is undefined.\n\nUse the following command to get statsVar; a table with the following entries in it: n, min, max, mean, and stddev:\n\nUse the following commands to print these entries:\n\nThe commands that return minimum and maximum values each also return tables. These tables contain the following values:'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.getstats',
    },
    {
        detail: 'This function creates a user-defined reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You cannot assign user-defined reading buffers the name defbuffer1 or defbuffer2.\n\nIf you create a reading buffer that has the same name as an existing user-defined buffer, the existing buffer is overwritten by the new buffer. Any data in the existing buffer is lost.\n\nWhen you create a reading buffer, it becomes the active buffer. If you create two reading buffers, the last one you create becomes the active buffer.\n\nThe default fill mode of a user-defined buffer is once. You can change it to continuous.\n\nOnce the buffer style is selected, it cannot be changed.\n\nNot all remote commands are compatible with the writable and full writable buffer styles. Check the Details section of the command descriptions before using them with any of these buffer styles.\n\nWritable readings are used to bring external data into the instrument. You cannot assign them to collect data from the instrument.\n\nYou can change the buffer capacity for an existing buffer through the front panel or by using the bufferVar.capacity command.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.make',
    },
    {
        detail: 'This function allows you to run a mathematical expression on a measurement. The expression is applied when the measurement is placed in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.math',
    },
    {
        detail: 'This function saves data from the specified reading buffer to a USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The filename must specify the full path (including /usb1/). If included, the file extension must be set to .csv. If no file extension is specified, .csv is added.\n\nFor options that save more than one item of time information, each item is comma-delimited. For example, the default format is date, time, and fractional seconds for each reading.\n\nExamples of valid destination file names:\n\nThe DMM6500 does not check for existing files when you save. Verify that you are using a unique name to avoid overwriting any existing CSV files on the flash drive.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.save',
    },
    {
        detail: 'This function appends data from the reading buffer to a file on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If the file you specify does not exist on the USB flash drive, this command creates the file.\n\nFor options that save more than one item of time information, each item is comma-delimited. For example, the default format is date, time, and fractional seconds for each reading.\n\nThe file extension .csv is appended to the filename if necessary. Any file extension other than .csv generates an error.\n\nThe index column entry in the .csv file starts at 1 for each append operation.\n\nExamples of valid destination file names:\n\nInvalid destination filename examples:\n\n— The period is not followed by csv.\n\n— The only allowed extension is .csv. If .csv is not assigned, it is automatically added.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.saveappend',
    },
    {
        detail: 'This function allows you to create up to three custom units of measure for use in buffers.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use custom units of measures in buffer math, channel math, and writable buffers.\n\nIf you specify more than two characters, the additional characters are ignored. Some characters are converted to other symbols:\n\nThis unit is reset when power is cycled. It is not affected by reset.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.unit',
    },
    {
        detail: 'This function sets the units and number of digits of the readings that are written into the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is valid when the buffer style is writable or full writable.\n\nDefines the units and the number of digits that are reported for the data. This command affects how the data is shown in the reading buffer and what is shown on the front-panel Home, Histogram, Reading Table, and Graph screens.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.write.format',
    },
    {
        detail: 'This function allows you to write readings into the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'For buffers that are set to the writable buffer style:\n\nFor buffers that are set to the full writable buffer style:\n\nThis command writes the data you specify into a reading buffer. The reading buffer must be set to the writable or full writable style, which is set when you make the buffer.\n\nData must be added in chronological order. If the time is not specified for a reading, it is set to one integer second after the last reading. As you write the data, the front-panel Home screen updates and displays the reading you entered.\n\nThe measureStatus parameter indicates the type of reading. The options are shown in the following table.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.write.reading',
    },
]

const bufferSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'buffer.channelmath(readingBuffer, unit, channelNumber, channelNum2, channelNumber, constant0, constant1, constant2, constant3, constant4, constant5)',
        undefined,
        ParameterInformation.create(
            'readingBuffer',
            'String that contains the name of the reading buffer; must be set to the style FULL.'
        ),
        ParameterInformation.create(
            'unit',
            'The units to be applied to the value generated by the expression:\nDC current: buffer.UNIT_AMP\nAC current: buffer.UNIT_AMP_AC\nCelsius: buffer.UNIT_CELSIUS\nCustom unit 1 (defined by buffer.unit()): buffer.UNIT_CUSTOM1\nCustom unit 2 (defined by buffer.unit()): buffer.UNIT_CUSTOM2\nCustom unit 3 (defined by buffer.unit()): buffer.UNIT_CUSTOM3\nDAC (voltage): buffer.UNIT_DAC\nDecibel-milliwatts: buffer.UNIT_DBM\nDecibels: buffer.UNIT_DECIBEL\nDigital I/O: buffer.UNIT_DIO\nFahrenheit: buffer.UNIT_FAHRENHEIT\nCapacitance: buffer.UNIT_FARAD\nFrequency: buffer.UNIT_HERTZ\nKelvin: buffer.UNIT_KELVIN\nNo unit: buffer.UNIT_NONE\nResistance: buffer.UNIT_OHM\nPercent: buffer.UNIT_PERCENT\nDC voltage ratio: buffer.UNIT_RATIO\nReciprocal: buffer.UNIT_RECIPROCAL\nPeriod: buffer.UNIT_SECOND\nTotalizer: buffer.UNIT_TOT\nDC voltage: buffer.UNIT_VOLT\nAC voltage: buffer.UNIT_VOLT_AC\nPower: buffer.UNIT_WATT\nbuffer.UNIT_X.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'String that contains the channel to apply the expression to, using normal channel list syntax; this is also the channel that supplies the r value in the expressions.'
        ),
        ParameterInformation.create(
            'channelNum2',
            'String that contains the channel from which to get the previous measurement (the a value in the expressions); a measurement must be made on this channel before the channelNumber.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'channelNum2.'
        ),
        ParameterInformation.create(
            'constant0',
            'The constant to be used for c0 in the expression.'
        ),
        ParameterInformation.create(
            'constant1',
            'The constant to be used for c1 in the expression.'
        ),
        ParameterInformation.create(
            'constant2',
            'The constant to be used for c2 in the expression.'
        ),
        ParameterInformation.create(
            'constant3',
            'The constant to be used for c3 in the expression.'
        ),
        ParameterInformation.create(
            'constant4',
            'The constant to be used for c4 in the expression.'
        ),
        ParameterInformation.create(
            'constant5',
            'The constant to be used for c5 in the expression.'
        ),
    ),
    SignatureInformation.create(
        'buffer.clearstats(bufferVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer; defaults to defbuffer1 if not specified.'
        ),
    ),
    SignatureInformation.create(
        'buffer.delete(bufferName)',
        undefined,
        ParameterInformation.create(
            'bufferName',
            'The name of a user-defined reading buffer.'
        ),
    ),
    SignatureInformation.create(
        'buffer.getstats(bufferVar, statsVar, channelNumber)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
        ParameterInformation.create(
            'statsVar',
            'A table with the following entries: n, min, max, mean, and stddev; see Details for information on the entries.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'The channel number from which to retrieve data.'
        ),
    ),
    SignatureInformation.create(
        'buffer.make(bufferVar, bufferSize, bufferVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'bufferSize',
            'The maximum number of readings that can be stored in bufferVar; minimum is 10.'
        ),
        ParameterInformation.create(
            'bufferVar',
            'bufferSize.'
        ),
    ),
    SignatureInformation.create(
        'buffer.math(readingBuffer, unit, constant0, constant1, constant2, constant3, constant4, constant5)',
        undefined,
        ParameterInformation.create(
            'readingBuffer',
            'String that contains the name of the reading buffer; must be set to the style FULL.'
        ),
        ParameterInformation.create(
            'unit',
            'The units to be applied to the value generated by the expression:\nDC current: buffer.UNIT_AMP\nAC current: buffer.UNIT_AMP_AC\nCelsius: buffer.UNIT_CELSIUS\nCustom unit 1 (defined by buffer.unit()): buffer.UNIT_CUSTOM1\nCustom unit 2 (defined by buffer.unit()): buffer.UNIT_CUSTOM2\nCustom unit 3 (defined by buffer.unit()): buffer.UNIT_CUSTOM3\nDAC (voltage): buffer.UNIT_DAC\nDecibel-milliwatts: buffer.UNIT_DBM\nDecibels: buffer.UNIT_DECIBEL\nDigital I/O: buffer.UNIT_DIO\nFahrenheit: buffer.UNIT_FAHRENHEIT\nCapacitance: buffer.UNIT_FARAD\nFrequency: buffer.UNIT_HERTZ\nKelvin: buffer.UNIT_KELVIN\nNo unit: buffer.UNIT_NONE\nResistance: buffer.UNIT_OHM\nPercent: buffer.UNIT_PERCENT\nDC voltage ratio: buffer.UNIT_RATIO\nReciprocal: buffer.UNIT_RECIPROCAL\nPeriod: buffer.UNIT_SECOND\nTotalizer: buffer.UNIT_TOT\nDC voltage: buffer.UNIT_VOLT\nAC voltage: buffer.UNIT_VOLT_AC\nPower: buffer.UNIT_WATT\nbuffer.UNIT_X.'
        ),
        ParameterInformation.create(
            'constant0',
            'The constant to be used for c0 in the expression.'
        ),
        ParameterInformation.create(
            'constant1',
            'The constant to be used for c1 in the expression.'
        ),
        ParameterInformation.create(
            'constant2',
            'The constant to be used for c2 in the expression.'
        ),
        ParameterInformation.create(
            'constant3',
            'The constant to be used for c3 in the expression.'
        ),
        ParameterInformation.create(
            'constant4',
            'The constant to be used for c4 in the expression.'
        ),
        ParameterInformation.create(
            'constant5',
            'The constant to be used for c5 in the expression.'
        ),
    ),
    SignatureInformation.create(
        'buffer.save(bufferVar, fileName, what, start, end)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer.'
        ),
        ParameterInformation.create(
            'fileName',
            'A string that indicates the name of the file on the USB flash drive in which to save the reading buffer.'
        ),
        ParameterInformation.create(
            'what',
            'Defines which information is saved in the file on the USB flash drive:.'
        ),
        ParameterInformation.create(
            'start',
            'Defines the starting point in the buffer to start saving data.'
        ),
        ParameterInformation.create(
            'end',
            'Defines the ending point in the buffer to stop saving data.'
        ),
    ),
    SignatureInformation.create(
        'buffer.saveappend(bufferVar, fileName, timeFormat, start, end)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'Indicates the reading buffer to use; the default buffers (defbuffer1 or defbuffer2) or the name of a user-defined buffer; if no buffer is specified, defbuffer1 is used.'
        ),
        ParameterInformation.create(
            'fileName',
            'A string that indicates the name of the file on the USB flash drive in which to save the reading buffer.'
        ),
        ParameterInformation.create(
            'timeFormat',
            'Indicates how date and time information from the buffer is saved in the file on the USB flash drive; the values are:\nSave dates, times, and fractional seconds: buffer.SAVE_FORMAT_TIME\nSaves relative timestamps: buffer.SAVE_RELATIVE_TIME\nSaves seconds and fractional seconds: buffer.SAVE_RAW_TIME\nSaves timestamps: buffer.SAVE_TIMESTAMP_TIME.'
        ),
        ParameterInformation.create(
            'start',
            'Defines the starting point in the buffer to start saving data.'
        ),
        ParameterInformation.create(
            'end',
            'Defines the ending point in the buffer to stop saving data.'
        ),
    ),
    SignatureInformation.create(
        'buffer.unit(N, unitOfMeasure)',
        undefined,
        ParameterInformation.create(
            'N',
            'The number of the custom unit, 1, 2, or 3.'
        ),
        ParameterInformation.create(
            'unitOfMeasure',
            'A string that defines the custom unit; up to two characters; defaults are X for custom unit 1, Y for unit 2, and Z for unit 3.'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.format(bufferVar, units, extraUnits, units, units, extraDigits, displayDigits, displayDigits)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'units',
            '\nbuffer.UNIT_HERTZ\nbuffer.UNIT_KELVIN\nbuffer.UNIT_NONE\nbuffer.UNIT_OHM\nbuffer.UNIT_PERCENT\nbuffer.UNIT_RATIO\nbuffer.UNIT_RECIPROCAL\nbuffer.UNIT_SECOND\nbuffer.UNIT_TOT\nbuffer.UNIT_VOLT\nbuffer.UNIT_VOLT_AC\nbuffer.UNIT_WATT\nbuffer.UNIT_X.'
        ),
        ParameterInformation.create(
            'extraUnits',
            'The units for the second measurement in the buffer index; the selections are the same as units  (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for units.'
        ),
        ParameterInformation.create(
            'units',
            'extraUnits.'
        ),
        ParameterInformation.create(
            'units',
            'The units for the second measurement in the buffer index; the selections are the same as units  (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for units.'
        ),
        ParameterInformation.create(
            'extraDigits',
            'The number of digits to use for the second measurement; the selections are the same as displayDigits  (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for displayDigits.'
        ),
        ParameterInformation.create(
            'displayDigits',
            'extraDigits.'
        ),
        ParameterInformation.create(
            'displayDigits',
            'The number of digits to use for the second measurement; the selections are the same as displayDigits  (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for displayDigits.'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.reading(bufferVar, readingValue, extraValue, seconds, measureStatus, channel)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'readingValue',
            'The first value that is recorded in the buffer index.'
        ),
        ParameterInformation.create(
            'extraValue',
            'A second value that is recorded in the buffer index (only valid for buffer style WRITABLE_FULL).'
        ),
        ParameterInformation.create(
            'seconds',
            'An integer that represents the seconds.'
        ),
        ParameterInformation.create(
            'measureStatus',
            'The type of reading; see Details.'
        ),
        ParameterInformation.create(
            'channel',
            'A string that specifies the channel to which to assign the data.'
        ),
    ),
]

export async function getBufferCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(bufferCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getBufferSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(bufferSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
