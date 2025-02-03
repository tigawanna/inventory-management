/* eslint-disable no-console */
import type { Logger } from "drizzle-orm/logger";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { envVariables } from "@/env";
import { ANSIColors } from "@/shared/utils/text";

import { formatSqlQuery } from "./helpers/query-logger";
import * as auditLogSchema from "./schema/auditlogs";
import * as inventorySchema from "./schema/inventory";
import * as usersSchema from "./schema/users";

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log(ANSIColors.Bright, "\n=== DRIZZLE QUERY ===");
    console.log("", formatSqlQuery(query), "\n");
    if (params && params.length > 0) {
      console.log(ANSIColors.Bright, "=== DRIZZLE PARAMS === ", ANSIColors.Reset, params, "\n");
      // console.log(params)
    }
  }
}

const RETRY_ATTEMPTS = 5;
const RETRY_DELAY = 10_000;

async function createLocalPool() {
  // console.log("Creating local database pool");
  // console.log(" =========== Database URL================= :", envVariables.DATABASE_URL);
  const { Pool } = pg;
  const pool = new Pool({
    max: 20,
    idleTimeoutMillis: 50_000,
    connectionTimeoutMillis: 5_000,
    connectionString: envVariables.DATABASE_URL,
  });

  // Test connection with retries
  for (let i = 0; i < RETRY_ATTEMPTS; i++) {
    try {
      const client = await pool.connect();

      console.log("Successfully connected to local database");
      client.release();
      return pool;
    }
    catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error);
      if (i < RETRY_ATTEMPTS - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
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
      schema: { ...auditLogSchema, ...inventorySchema, ...usersSchema },
      logger: envVariables.LOG_LEVEL === "debug" && new MyLogger(),
    });
  }

  return drizzle({
    client: neon(envVariables.DATABASE_URL),
    schema: { ...auditLogSchema, ...inventorySchema, ...usersSchema },
  });
}

// export const db = await createDB().catch((error) => {
//   console.error("Failed to initialize database:", error);
//   process.exit(1);
// });

export const db = drizzle({
  client: neon(envVariables.DATABASE_URL),
    schema: { ...auditLogSchema, ...inventorySchema, ...usersSchema },
});

//  run only use for local
// const pool = await createLocalPool();
// export const db = pgDrizzle({
//   client: pool,
//   schema: { ...auditLogSchema, ...inventorySchema, ...usersSchema },
//   logger: envVariables.LOG_LEVEL === "debug" && new MyLogger(),
// });
