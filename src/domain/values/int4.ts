import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

/**
 * PostgreSQL int4 range: -2.147.483.648 to 2.147.483.647
 * This implementation only accepts non-negative values: 0 to 2.147.483.647
 * @see https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-INT4
 */
const MAX_VALUE = 2_147_483_647
const MIN_VALUE = 0

const schema = z
  .number()
  .int('Valor deve ser um número inteiro')
  .nonnegative('Valor não pode ser negativo')
  .min(MIN_VALUE, `Valor deve ser maior ou igual a ${MIN_VALUE}`)
  .max(MAX_VALUE, `Valor deve ser menor ou igual a ${MAX_VALUE}`)

export class Int4 extends BaseValue<number> {
  static readonly MIN_VALUE = MIN_VALUE
  static readonly MAX_VALUE = MAX_VALUE

  static from(value: number): Int4 {
    return new Int4(value, schema)
  }

  toNumber(): number {
    return this._value
  }

  toString(): string {
    return this._value.toString()
  }
}
