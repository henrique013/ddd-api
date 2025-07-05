import { ICacheProvider } from '@domain/providers/cache.js'

export class CacheFakeProvider implements ICacheProvider {
  private cache: Map<string, { value: unknown; expiresAt: number }> = new Map()

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key)

    if (!item) return null

    if (item.expiresAt < Date.now()) {
      this.cache.delete(key)
      return null
    }

    return item.value as T
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000

    this.cache.set(key, { value, expiresAt })
  }
}
