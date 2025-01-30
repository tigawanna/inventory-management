import Redis from "ioredis";

import { envVariables } from "@/env";

// export const redisClient = new Redis(envVariables.REDIS_PORT); // Default port is 6379
const RETRY_ATTEMPTS = 5;
const RETRY_DELAY = 10_000;

async function createRedisClient(): Promise<Redis> {
  for (let i = 0; i < RETRY_ATTEMPTS; i++) {
    try {
      const client = new Redis(envVariables.REDIS_PORT);

      // Test connection
      await client.ping();
      // console.log("Successfully connected to Redis");
      return client;
    }
    catch (error) {
      console.error(`Redis connection attempt ${i + 1} failed:`, error);
      if (i < RETRY_ATTEMPTS - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  throw new Error("Failed to connect to Redis after multiple attempts");
}

export const redisClient = await createRedisClient();
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
