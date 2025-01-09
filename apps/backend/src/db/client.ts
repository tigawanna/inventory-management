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

function creteDB() {
  if (envVariables.NODE_ENV === "development") {
    const { Pool } = pg;
    // Instantiate Drizzle client with pg driver and schema.
    return pgDrizzle({
      client: new Pool({
        connectionString: envVariables.DATABASE_URL,
      }),
      schema: { ...inventorySchema, ...usersSchema },
      logger: envVariables.NODE_ENV === "development" ? new MyLogger() : false,
    });
  }
  return drizzle({
    client: neon(envVariables.DATABASE_URL),
    schema: { ...inventorySchema, ...usersSchema },
    // logger: envVariables.NODE_ENV === "development" ? new MyLogger() : false,
  });
}

// // Use pg driver.
export const db = creteDB();
