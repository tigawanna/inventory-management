import "dotenv/config";
import { z } from "zod";

export const env = {
  port: parseInt(process.env.PORT || "5000"),
  dbUrl: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};

const envScheme = z.object({
  port: z.number(),
  dbUrl: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export const envVariables = envScheme.parse(env);
