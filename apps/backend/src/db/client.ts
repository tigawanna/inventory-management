import * as usersSchema from "./schema/users.ts";
import * as inventorySchema from "./schema/inventory.ts";
import type { Logger } from "drizzle-orm/logger";
import { formatSqlQuery } from "./helpers/query-logger.ts";
import { envVariables } from "@/env.ts";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log("=== DRIZZLE QUERY ===");
    console.log(`%c${formatSqlQuery(query)}`, "color:cyan");
    if (params && params.length > 0) {
      console.log("=== DRIZZLE PARAMS ===");
      console.log(`%c${JSON.stringify(params)}`, "color:blue");
    }
  }
}

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

async function createLocalPool() {
  const { Pool } = pg;
  const pool = new Pool({
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    connectionString: envVariables.DATABASE_URL,
  });

  // Test connection with retries
  for (let i = 0; i < RETRY_ATTEMPTS; i++) {
    try {
      const client = await pool.connect();
      console.log("Successfully connected to local database");
      client.release();
      return pool;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error);
      if (i < RETRY_ATTEMPTS - 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  throw new Error("Failed to connect to database after multiple attempts");
}

export async function createDB() {
  if (envVariables.NODE_ENV === "development") {
    const pool = await createLocalPool();
    return pgDrizzle({
      client: pool,
      schema: { ...inventorySchema, ...usersSchema },
      logger: new MyLogger(),
    });
  }

  return drizzle({
    client: neon(envVariables.DATABASE_URL),
    schema: { ...inventorySchema, ...usersSchema },
  });
}

// Initialize DB with error handling
// export const db = createDB().catch((error) => {
//   console.error("Failed to initialize database:", error);
//   process.exit(1);
// });

export const db = drizzle({
  client: neon(envVariables.DATABASE_URL),
  schema: { ...inventorySchema, ...usersSchema },
});
