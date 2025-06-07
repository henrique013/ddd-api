import { describe, it, expect } from 'vitest'
import { BadArgumentError } from '@domain/errors/bad-argument.js'

describe('BadArgumentError', () => {
  describe('toHttpStatus', () => {
    it('should return correct HTTP status code and name', () => {
      const error = new BadArgumentError('Invalid argument')
      const httpStatus = error.toHttpStatus()

      expect(httpStatus).toEqual({
        code: 400,
        name: 'Bad Request',
      })
    })
  })
})
