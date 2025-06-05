import { BaseError, HttpStatus } from '@domain/errors.js'

export class RuntimeError extends BaseError {
  toHttpStatus(): HttpStatus {
    return {
      code: 500,
      name: 'Internal Server Error',
    }
  }
}
