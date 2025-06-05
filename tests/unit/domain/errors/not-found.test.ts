import { describe, it, expect } from 'vitest'
import { NotFoundError } from '@domain/errors/not-found.js'

describe('NotFoundError', () => {
  describe('toHttpStatus', () => {
    it('should return correct HTTP status code and name', () => {
      const error = new NotFoundError('Resource not found')
      const httpStatus = error.toHttpStatus()

      expect(httpStatus).toEqual({
        code: 404,
        name: 'Not Found',
      })
    })
  })
})
