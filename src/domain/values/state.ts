import { z } from 'zod'
import { BaseValue } from '@domain/values.js'

export enum StateEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

const schema = z.nativeEnum(StateEnum, {
  errorMap: () => ({ message: 'UF inválida' }),
})

export class State extends BaseValue<StateEnum> {
  static readonly values = Object.values(StateEnum)

  static from(value: string): State {
    return new State(value.toUpperCase() as StateEnum, schema)
  }

  toString(): string {
    return this._value
  }
}
