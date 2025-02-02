import { QueryClient } from "@tanstack/query-core";

import type { CacheStore } from "./cache-store-service";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export class TanstackQueryService implements CacheStore {
  private client: QueryClient;

  constructor() {
    this.client = queryClient;
  }

  async get(key: string[]): Promise<string | null> {
    const data = this.client.getQueryData([key]);
    return data ? JSON.stringify(data) : null;
  }

  async set(key: string[], value: string): Promise<void> {
    const parsed = JSON.parse(value);
    this.client.setQueryData([key], parsed, {
      updatedAt: Date.now(),
    });
  }

  async del(key: string[]): Promise<void> {
    this.client.removeQueries({ queryKey: [key] });
  }
}
