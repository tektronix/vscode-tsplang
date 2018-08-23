/*
 *  Copyright 2018 Tektronix Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const bufferCompletions: Array<CompletionItem> = [
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
            value: 'This function returns a table with statistical data about the data that was placed in the reading buffer.\n\nThe instrument automatically updates reading buffer statistics as data is added to the reading buffer.\n\nWhen the reading buffer is configured to fill continuously and overwrite older data with new data, the buffer statistics include the data that was overwritten. To get statistics that do not include data that has been overwritten, define a large buffer size that will accommodate the number of readings you will make.\n\nThe table returned from this function provides statistics at the time the function is called. Although the instrument continues to update the statistics, the table that is returned is not updated. To get fresh statistics, call this function again.\n\nThe statsVar parameter contains the values described in the following table.\n\nIf n equals zero (0), all other values are nil. If n equals 1, stddev is nil because the standard deviation of a sample size of 1 is undefined.\n\nUse the following command to get statsVar; a table with the following entries in it: n, min, max, mean, and stddev.\n\nUse the following commands to print these entries:\n\nThe commands that return minimum and maximum values each also return tables. These tables contain the following values:'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.getstats',
    },
    {
        detail: 'This function creates a user-defined reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You cannot assign user-defined reading buffers the name defbuffer1 or defbuffer2.\n\nIf you create a reading buffer that has the same name as an existing user-defined buffer, the existing buffer is overwritten by the new buffer. Any data in the existing buffer is lost.\n\nWhen you create a reading buffer, it becomes the active buffer. If you create two reading buffers, the last one you create becomes the active buffer.\n\nThe default fill mode of a user‑defined buffer is once. You can change it to continuous.\n\nOnce the buffer style is selected, it cannot be changed.\n\nOnce you store the first reading in a compact buffer, you cannot change certain measurement settings, including range, display digits, and units; you must clear the buffer first.\n\nNot all remote commands are compatible with the compact, writable, and full writable buffer styles. Check the Details section of the command descriptions before using them with any of these buffer styles.\n\nWritable readings are used to bring external data into the instrument. You cannot assign them to collect data from the instrument.\n\nYou can change the buffer capacity for an existing buffer through the front panel or by using the bufferVar.capacity command.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.make',
    },
    {
        detail: 'This function saves data from the specified reading buffer to a USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The filename must specify the full path (including /usb1/). If included, the file extension must be set to .csv (if no file extension is specified, .csv is added).\n\nFor options that save more than one item of time information, each item is comma-delimited. For example, the default format is date, time, and fractional seconds for each reading.\n\nExamples of valid destination file names:\n\nThe Model 2460 does not check for existing files when you save. Verify that you are using a unique name to avoid overwriting any existing .csv files on the flash drive.'
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
        detail: 'This function sets the units and number of digits of the readings that are written into the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is valid when the buffer style is writable or full writable.\n\nDefines the units and the number of digits that are reported for the data. This function affects how the data is shown in the reading buffer and what is shown on the front‑panel Home, Histogram, Reading Table, and Graph screens.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.write.format',
    },
    {
        detail: 'This function allows you to write readings into the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command writes the data you specify into a reading buffer. The reading buffer must be set to the writable or full writable style, which is set when you make the buffer.\n\nData must be added in chronological order. If the time is not specified for a reading, it is set to one integer second after the last reading. As you write the data, the front‑panel Home screen updates and displays the reading you entered.'
        },
        kind: CompletionItemKind.Function,
        label: 'buffer.write.reading',
    },
]

const bufferSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'buffer.clearstats(bufferVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.'
        ),
    ),
    SignatureInformation.create(
        'buffer.delete(bufferName)',
        undefined,
        ParameterInformation.create(
            'bufferName',
            'The name of a user‑defined reading buffer.'
        ),
    ),
    SignatureInformation.create(
        'buffer.getstats(bufferVar, statsVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
        ParameterInformation.create(
            'statsVar',
            'A table with the following entries: n, min, max, mean, and stddev; see Details for information on the entries.'
        ),
    ),
    SignatureInformation.create(
        'buffer.make(bufferVar, bufferSize, bufferVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'A user‑supplied string that indicates the name of the buffer.'
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
        'buffer.save(bufferVar, fileName, timeFormat, start, end)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer.'
        ),
        ParameterInformation.create(
            'fileName',
            'A string that indicates the name of the file on the USB flash drive in which to save the reading buffer.'
        ),
        ParameterInformation.create(
            'timeFormat',
            'Defines how date and time information from the buffer is saved in the file on the USB flash drive; the values are:\nSave dates, times, and fractional seconds; buffer.SAVE_FORMAT_TIME\nSaves relative timestamps; buffer.SAVE_RELATIVE_TIME\nSaves seconds and fractional seconds; buffer.SAVE_RAW_TIME\nSaves timestamps; buffer.SAVE_TIMESTAMP_TIME.'
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
            'A string that indicates the reading buffer; the default buffers (defbuffer1 or defbuffer2) or the name of a user‑defined buffer; if no buffer is specified, defbuffer1 is used.'
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
        'buffer.write.format(bufferVar, units, extraUnits, units, units, extraDigits, displayDigits, displayDigits)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'units',
            '\nbuffer.UNIT_OHM\nbuffer.UNIT_PERCENT\nbuffer.UNIT_RATIO\nbuffer.UNIT_RECIPROCAL\nbuffer.UNIT_SECOND\nbuffer.UNIT_VOLT\nbuffer.UNIT_VOLT_AC\nbuffer.UNIT_WATT\nbuffer.UNIT_X.'
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
        'buffer.write.reading(bufferVar, readingValue, extraValue, status)',
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
            'status',
            'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to 256 to graph a family of curves (default is0).'
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
