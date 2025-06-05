import { describe, it, expect } from 'vitest'
import { RuntimeError } from '@domain/errors/runtime.js'

describe('RuntimeError', () => {
  describe('toHttpStatus', () => {
    it('should return correct HTTP status code and name', () => {
      const error = new RuntimeError('An unexpected error occurred')
      const httpStatus = error.toHttpStatus()

      expect(httpStatus).toEqual({
        code: 500,
        name: 'Internal Server Error',
      })
    })
  })
})
