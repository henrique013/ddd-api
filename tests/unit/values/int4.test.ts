import { describe, it, expect } from 'vitest'
import { Int4 } from '@domain/values/int4.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('Int4', () => {
  describe('constants', () => {
    it('should have correct min and max value constants', () => {
      expect(Int4.MIN_VALUE).toBe(0)
      expect(Int4.MAX_VALUE).toBe(2_147_483_647)
    })
  })

  describe('from', () => {
    it('should create instance with valid value at minimum', () => {
      const int4 = Int4.from(0)
      expect(int4.toNumber()).toBe(0)
    })

    it('should create instance with valid value at maximum', () => {
      const int4 = Int4.from(Int4.MAX_VALUE)
      expect(int4.toNumber()).toBe(Int4.MAX_VALUE)
    })

    it('should throw BadArgumentError when value is not an integer', () => {
      expect(() => Int4.from(1.5)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when value is negative', () => {
      expect(() => Int4.from(-1)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when value is greater than MAX_VALUE', () => {
      expect(() => Int4.from(Int4.MAX_VALUE + 1)).toThrow(BadArgumentError)
    })
  })

  describe('toNumber', () => {
    it('should return minimum value', () => {
      const int4 = Int4.from(0)
      expect(int4.toNumber()).toBe(0)
    })

    it('should return maximum value', () => {
      const int4 = Int4.from(Int4.MAX_VALUE)
      expect(int4.toNumber()).toBe(Int4.MAX_VALUE)
    })
  })

  describe('toString', () => {
    it('should return string representation of minimum value', () => {
      const int4 = Int4.from(0)
      expect(int4.toString()).toBe('0')
    })

    it('should return string representation of maximum value', () => {
      const int4 = Int4.from(Int4.MAX_VALUE)
      expect(int4.toString()).toBe(Int4.MAX_VALUE.toString())
    })
  })
})
