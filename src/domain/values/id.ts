import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

/**
 * PostgreSQL int4 positive range: 0 to 2.147.483.647
 * @see https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-INT4
 */
const MAX_VALUE = 2_147_483_647
const MIN_VALUE = 1

const schema = z
  .number()
  .int({ error: 'ID deve ser um número inteiro' })
  .nonnegative({ error: 'ID não pode ser negativo' })
  .min(MIN_VALUE, { error: `ID deve ser maior ou igual a ${MIN_VALUE}` })
  .max(MAX_VALUE, { error: `ID deve ser menor ou igual a ${MAX_VALUE}` })

export class Id extends BaseValue<number> {
  static readonly MIN_VALUE = MIN_VALUE
  static readonly MAX_VALUE = MAX_VALUE

  static from(value: number): Id {
    return new Id(value, schema)
  }

  toNumber(): number {
    return this._value
  }

  toString(): string {
    return this._value.toString()
  }
}
