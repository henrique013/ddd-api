import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

const MIN_VALUE = 11
const MAX_VALUE = 99

const schema = z
  .number()
  .int('DDD deve ser um número inteiro')
  .min(MIN_VALUE, `DDD deve ser maior ou igual a ${MIN_VALUE}`)
  .max(MAX_VALUE, `DDD deve ser menor ou igual a ${MAX_VALUE}`)
  .refine((value) => value % 10 !== 0, 'DDD não pode ser divisível por 10')

export class DDD extends BaseValue<number> {
  static readonly MIN_VALUE = MIN_VALUE
  static readonly MAX_VALUE = MAX_VALUE

  static from(value: number): DDD {
    return new DDD(value, schema)
  }

  toNumber(): number {
    return this._value
  }

  toString(): string {
    return this._value.toString()
  }
}
