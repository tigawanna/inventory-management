import "dotenv/config";
import { z } from "zod";

// export const env = {
//   port: parseInt(process.env.PORT || "5000"),
//   dbUrl: process.env.DATABASE_URL,
//   NODE_ENV: process.env.NODE_ENV,


// };

const envScheme = z.object({
  PORT: z.number(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string(),
  API_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const envVariables = envScheme.parse(process.env);
