import Redis from "ioredis";

import { envVariables } from "@/env";

import type { CacheStore } from "./cache-store-service";

// export const redisClient = new Redis(envVariables.REDIS_PORT); // Default port is 6379

export class RedisCache implements CacheStore {
  public client: Redis;

  constructor() {
    this.client = new Redis(envVariables.REDIS_PORT || "6379");
  }

  async get(key: string[]): Promise<string | null> {
    const keyString = JSON.stringify(key);
    return this.client.get(keyString);
  }

  async set(key: string[], value: string, ttl: number): Promise<void> {
    const keyString = JSON.stringify(key);
    await this.client.set(keyString, value, "EX", ttl);
  }

  async del(key: string[]): Promise<void> {
    const keyString = JSON.stringify(key);
    await this.client.del(keyString);
  }
}
