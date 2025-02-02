import type { CacheStore } from "./cache-store-service";

interface CacheItem {
  value: string;
  expiry: number | null;
}

export class InMemoryCache implements CacheStore {
  private store: Map<string, CacheItem>;

  constructor() {
    this.store = new Map();
  }

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item)
      return null;

    if (item.expiry && item.expiry < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    const expiry = ttl ? Date.now() + (ttl * 1000) : null;
    this.store.set(key, { value, expiry });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  // Optional: Add cleanup method for expired items
  private cleanup() {
    const now = Date.now();
    for (const [key, item] of this.store.entries()) {
      if (item.expiry && item.expiry < now) {
        this.store.delete(key);
      }
    }
  }
}
