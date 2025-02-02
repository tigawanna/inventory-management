import { envVariables } from "@/env";

import { InMemoryCache } from "./in-memory-cacher";
import { RedisCache } from "./redis-service";

export interface CacheStore {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttl: number) => Promise<void>;
  del: (key: string) => Promise<void>;
}

export function createCacheStore(): CacheStore {
  if (envVariables.REDIS_PORT) {
    return new RedisCache();
  }
  return new InMemoryCache();
}
