import { describe, it, expect } from 'vitest'
import { State, StateEnum } from '@domain/values/state.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('State', () => {
  describe('values', () => {
    it('should have all Brazilian states', () => {
      expect(State.values).toContain(StateEnum.AC)
      expect(State.values).toContain(StateEnum.AL)
      expect(State.values).toContain(StateEnum.AP)
      expect(State.values).toContain(StateEnum.AM)
      expect(State.values).toContain(StateEnum.BA)
      expect(State.values).toContain(StateEnum.CE)
      expect(State.values).toContain(StateEnum.DF)
      expect(State.values).toContain(StateEnum.ES)
      expect(State.values).toContain(StateEnum.GO)
      expect(State.values).toContain(StateEnum.MA)
      expect(State.values).toContain(StateEnum.MT)
      expect(State.values).toContain(StateEnum.MS)
      expect(State.values).toContain(StateEnum.MG)
      expect(State.values).toContain(StateEnum.PA)
      expect(State.values).toContain(StateEnum.PB)
      expect(State.values).toContain(StateEnum.PR)
      expect(State.values).toContain(StateEnum.PE)
      expect(State.values).toContain(StateEnum.PI)
      expect(State.values).toContain(StateEnum.RJ)
      expect(State.values).toContain(StateEnum.RN)
      expect(State.values).toContain(StateEnum.RS)
      expect(State.values).toContain(StateEnum.RO)
      expect(State.values).toContain(StateEnum.RR)
      expect(State.values).toContain(StateEnum.SC)
      expect(State.values).toContain(StateEnum.SP)
      expect(State.values).toContain(StateEnum.SE)
      expect(State.values).toContain(StateEnum.TO)
    })
  })

  describe('from', () => {
    it('should create instance with valid state', () => {
      const state = State.from('SP')
      expect(state.toString()).toBe('SP')
    })

    it('should convert lowercase to uppercase', () => {
      const state = State.from('sp')
      expect(state.toString()).toBe('SP')
    })

    it('should throw BadArgumentError when state is invalid', () => {
      expect(() => State.from('XX')).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when state is empty', () => {
      expect(() => State.from('')).toThrow(BadArgumentError)
    })
  })

  describe('toString', () => {
    it('should return the state code', () => {
      const state = State.from('SP')
      expect(state.toString()).toBe('SP')
    })
  })
})
