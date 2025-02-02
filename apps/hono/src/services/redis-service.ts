import Redis from "ioredis";

import { envVariables } from "@/env";

import type { CacheStore } from "./cache-store-service";

// export const redisClient = new Redis(envVariables.REDIS_PORT); // Default port is 6379

export class RedisCache implements CacheStore {
  public client: Redis;

  constructor() {
    this.client = new Redis(envVariables.REDIS_PORT || "6379");
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
