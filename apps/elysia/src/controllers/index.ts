import { Elysia } from "elysia";
import { users } from "./users.js";

export const root = new Elysia().use(users).get("/", "hello world");
