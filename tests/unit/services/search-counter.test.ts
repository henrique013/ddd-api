import { describe, it, expect, vi } from 'vitest'
import { SearchCounterService } from '@domain/services/search-counter.js'
import { SearchCounter } from '@domain/entities/search-counter.js'
import { DDD } from '@domain/values/ddd.js'

describe('SearchCounterService', () => {
  describe('increment', () => {
    it('should increment existing counter when found', async () => {
      const existingCounter = SearchCounter.fromRaw({ ddd: 11, counter: 5 })

      const mockSearchCountersRepo = {
        findByDdd: vi.fn().mockResolvedValue(existingCounter),
        save: vi.fn().mockResolvedValue(undefined),
      }

      const searchCounterService = new SearchCounterService(mockSearchCountersRepo)
      const ddd = DDD.from(11)

      await searchCounterService.increment(ddd)

      expect(mockSearchCountersRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockSearchCountersRepo.save).toHaveBeenCalledWith(existingCounter)
      expect(existingCounter.counter.toNumber()).toBe(6)
    })

    it('should create new counter when none exists', async () => {
      const mockSearchCountersRepo = {
        findByDdd: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
      }

      const searchCounterService = new SearchCounterService(mockSearchCountersRepo)
      const ddd = DDD.from(21)

      await searchCounterService.increment(ddd)

      expect(mockSearchCountersRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockSearchCountersRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ddd: expect.objectContaining({ _value: 21 }),
          counter: expect.objectContaining({ _value: 1 }),
        })
      )
    })
  })
})
