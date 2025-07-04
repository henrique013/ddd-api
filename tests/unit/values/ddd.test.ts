import { describe, it, expect } from 'vitest'
import { DDD } from '@domain/values/ddd.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('DDD', () => {
  describe('constants', () => {
    it('should have correct min and max value constants', () => {
      expect(DDD.MIN_VALUE).toBe(11)
      expect(DDD.MAX_VALUE).toBe(99)
    })
  })

  describe('from', () => {
    it('should create instance with valid ddd', () => {
      const ddd = DDD.from(11)
      expect(ddd.toNumber()).toBe(11)
    })

    it('should throw BadArgumentError when ddd is not an integer', () => {
      expect(() => DDD.from(11.5)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when ddd is less than MIN_VALUE', () => {
      expect(() => DDD.from(10)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when ddd is greater than MAX_VALUE', () => {
      expect(() => DDD.from(100)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when ddd is divisible by 10', () => {
      expect(() => DDD.from(20)).toThrow(BadArgumentError)
    })
  })

  describe('toNumber', () => {
    it('should return the numeric value', () => {
      const ddd = DDD.from(11)
      expect(ddd.toNumber()).toBe(11)
    })
  })

  describe('toString', () => {
    it('should return the string representation of the ddd', () => {
      const ddd = DDD.from(11)
      expect(ddd.toString()).toBe('11')
    })
  })
})
