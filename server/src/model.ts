'use strict'

export namespace Model {
    export const KI2450 = '2450'
    export const KI2460 = '2460'
    export const KI2461 = '2461'
    export const KI2461SYS = '2461-sys'
    export const KI6500 = '6500'
    export function fromString(value: string): Model | undefined {
        if (value === KI2450
                || value === KI2460
                || value === KI2461
                || value === KI2461SYS
                || value === KI6500) {
            return value as Model
        }
        else {
            return undefined
        }
    }
}
export type Model = '2450' | '2460' | '2461' | '2461-sys' | '6500' | undefined
