import Redis from "ioredis";

export const redisClient = new Redis(); // Default port is 6379

export class CacheService {
  private client: Redis;

  constructor(client: Redis) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.set(key, value, "EX", ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
export const cacheService = new CacheService(redisClient);
