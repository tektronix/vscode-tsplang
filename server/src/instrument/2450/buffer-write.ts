'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

/* TODO: buffer.write.reading parameter 'status' is not helpful */

const bufferWriteCompletions: Array<CompletionItem> = [
    {
        data: ['buffer'],
        kind: CompletionItemKind.Module,
        label: 'write'
    },
    {
        data: ['write', 'buffer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction format(bufferVar, units, displayDigits, extraUnits, extraDigits)\n```\n\
\n\
buffer.write.format(bufferVar, buffer.UNIT_\\*, buffer.DIGITS_\\*[, extraUnits][, extraDigits])\n\
\n\
Set the units and number of digits of readings written to the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Defines the units and the number of digits that are reported for the data. This function affects how the data is \
shown in the reading buffer and what is shown on the front‑panel Home, Histogram, Reading Table, and Graph screens.'
        },
        kind: CompletionItemKind.Function,
        label: 'format'
    },
    {
        data: ['write', 'buffer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reading(bufferVar, readingValue, seconds, fractionalSeconds, status)\n```\n\
\n\
buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])\n\
\n\
Write readings into the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Data must be added in chronological order. If the time is not specified for a reading, it is set to one integer \
second after the last reading. As you write the data, the front‑panel Home screen updates and displays the reading \
you entered.'
        },
        kind: CompletionItemKind.Function,
        label: 'reading'
    },
]

const bufferWriteSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'buffer.write.format(bufferVar, units, displayDigits[, extraUnits][, extraDigits])',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'units',
            'One of:\n\
buffer.UNIT_AMP\n\
buffer.UNIT_AMP_AC\n\
buffer.UNIT_CELSIUS\n\
buffer.UNIT_DECIBEL\n\
buffer.UNIT_FAHRENHEIT\n\
buffer.UNIT_FARAD\n\
buffer.UNIT_HERTZ\n\
buffer.UNIT_KELVIN\n\
buffer.UNIT_NONE\n\
buffer.UNIT_OHM\n\
buffer.UNIT_PERCENT\n\
buffer.UNIT_RATIO\n\
buffer.UNIT_RECIPROCAL\n\
buffer.UNIT_SECOND\n\
buffer.UNIT_VOLT\n\
buffer.UNIT_VOLT_AC\n\
buffer.UNIT_WATT\n\
buffer.UNIT_X.'
        ),
        ParameterInformation.create(
            'displayDigits',
            'The number of digits to use for the first measurement. One of:\n\
buffer.DIGITS_3_5\n\
buffer.DIGITS_4_5\n\
buffer.DIGITS_5_5\n\
buffer.DIGITS_6_5\n\
buffer.DIGITS_7_5\n\
buffer.DIGITS_8_5'
        ),
        ParameterInformation.create(
            'extraUnits',
            'The units for the second measurement in the buffer index; the selections are the same as units (only \
valid for buffer style WRITABLE_FULL); if not specified, will use the value for units.'
        ),
        ParameterInformation.create(
            'extraDigits',
            'The number of digits to use for the second measurement; the selections are the same as displayDigits \
(only valid for buffer style WRITABLE_FULL); if not specified, will use the value for displayDigits.'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])',
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
            'seconds',
            'An integer that repesents the seconds.'
        ),
        ParameterInformation.create(
            'fractionalSeconds',
            'The portion of the time that represents the fractional seconds.'
        ),
        ParameterInformation.create(
            'status',
            'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to 256 to graph a \
family of curves (default is 0).'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.reading(bufferVar, readingValue[, extraValue][, seconds][, fractionalSeconds][, status])',
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
            'An integer that repesents the seconds.'
        ),
        ParameterInformation.create(
            'fractionalSeconds',
            'The portion of the time that represents the fractional seconds.'
        ),
        ParameterInformation.create(
            'status',
            'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to 256 to graph a \
family of curves (default is 0).'
        ),
    ),
]

export async function getBufferWriteCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(bufferWriteCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getBufferWriteSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(bufferWriteSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
