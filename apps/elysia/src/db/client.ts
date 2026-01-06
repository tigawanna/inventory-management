import { envVariables } from "@/env";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(envVariables.DATABASE_URL);
