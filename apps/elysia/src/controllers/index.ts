import { Elysia } from "elysia";
import { users } from "./users.js";
import { openapi } from "@elysiajs/openapi";



export const root = new Elysia()
.get("/", "hello world")
.use(users)
