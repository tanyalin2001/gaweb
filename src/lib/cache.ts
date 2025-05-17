const CACHE_TTL = 24 * 60 * 60 * 1000;

class CacheManager {
  private cache: Map<string, { data: any; expires: number }>;

  constructor() {
    this.cache = new Map();
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  set(key: string, data: any, ttl = CACHE_TTL) {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }
}

export const cache = new CacheManager();
