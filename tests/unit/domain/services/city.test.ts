import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CityService } from '@domain/services/city.js'
import { City } from '@domain/entities/city.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'

describe('CityService', () => {
  const mockCitiesRepo = {
    findByDdd: vi.fn(),
    createMany: vi.fn(),
  }

  const mockCitiesExternalRepo = {
    findByDdd: vi.fn(),
  }

  const cityService = new CityService(mockCitiesRepo, mockCitiesExternalRepo)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findByDddOrFail', () => {
    it('should return cities from local repository when found', async () => {
      const ddd = DDD.from(11)
      const localCities = [
        City.fromRaw({ id: 1, name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ id: 2, name: 'Guarulhos', state: 'SP', ddd: 11 }),
      ]

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(localCities)

      const result = await cityService.findByDddOrFail(ddd)

      expect(result).toEqual(localCities)
      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).not.toHaveBeenCalled()
      expect(mockCitiesRepo.createMany).not.toHaveBeenCalled()
    })

    it('should fetch from external repository and save to local when not found locally', async () => {
      const ddd = DDD.from(11)
      const localCities: City[] = []
      const externalCities = [
        City.fromRaw({ name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ name: 'Guarulhos', state: 'SP', ddd: 11 }),
      ]
      const createdCities = [
        City.fromRaw({ id: 1, name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ id: 2, name: 'Guarulhos', state: 'SP', ddd: 11 }),
      ]

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(localCities)
      mockCitiesExternalRepo.findByDdd.mockResolvedValueOnce(externalCities)
      mockCitiesRepo.createMany.mockResolvedValueOnce(createdCities)

      const result = await cityService.findByDddOrFail(ddd)

      expect(result).toEqual(createdCities)
      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesRepo.createMany).toHaveBeenCalledWith(externalCities)
    })

    it('should throw NotFoundError when no cities are found in both repositories', async () => {
      const ddd = DDD.from(11)
      const localCities: City[] = []
      const externalCities: City[] = []

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(localCities)
      mockCitiesExternalRepo.findByDdd.mockResolvedValueOnce(externalCities)

      await expect(cityService.findByDddOrFail(ddd)).rejects.toThrow(NotFoundError)

      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesRepo.createMany).not.toHaveBeenCalled()
    })
  })
})
