import { Elysia } from "elysia";
import { users } from "./users.js";

export const root = new Elysia()
  .get(
    "/",
    () => ({ message: "hello world", status: "ok" }),
    {
      detail: {
        summary: 'Health Check',
        description: 'Check if the API is running',
        tags: ['General'],
        responses: {
          200: {
            description: 'API is healthy and running',
          },
        },
      },
    }
  )
  .use(users);
