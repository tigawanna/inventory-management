import { defineConfig } from "drizzle-kit";
import "dotenv/config";

import { envVariables } from "@/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: envVariables.DATABASE_URL,
  },
});
