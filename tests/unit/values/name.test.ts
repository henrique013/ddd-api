import { describe, it, expect } from 'vitest'
import { Name } from '@domain/values/name.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('Name', () => {
  describe('constants', () => {
    it('should have correct min and max length constants', () => {
      expect(Name.MIN_LENGTH).toBe(2)
      expect(Name.MAX_LENGTH).toBe(50)
    })
  })

  describe('from', () => {
    it('should create instance with valid name', () => {
      const name = Name.from('John Doe')
      expect(name.toString()).toBe('John Doe')
    })

    it('should trim whitespace from input', () => {
      const name = Name.from('  John Doe  ')
      expect(name.toString()).toBe('John Doe')
    })

    it('should normalize multiple spaces between words', () => {
      const name = Name.from('John   Doe')
      expect(name.toString()).toBe('John Doe')
    })

    it('should throw BadArgumentError when name is too short', () => {
      expect(() => Name.from('A')).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when name is too long', () => {
      const longName = 'A'.repeat(Name.MAX_LENGTH + 1)
      expect(() => Name.from(longName)).toThrow(BadArgumentError)
    })

    it('should throw BadArgumentError when name is empty after trim', () => {
      expect(() => Name.from('   ')).toThrow(BadArgumentError)
    })
  })

  describe('toString', () => {
    it('should return normalized name', () => {
      const name = Name.from('  John   Doe  ')
      expect(name.toString()).toBe('John Doe')
    })
  })
})
