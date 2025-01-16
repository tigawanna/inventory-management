import { envVariables } from "@/env";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: envVariables.DATABASE_URL,
  },
});
