import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { root } from "@/controllers";

const app = new Elysia({ adapter: node() })
  .use(root)
  .listen(3000, ({ url }) => {
    console.log(`🦊 Elysia is running at ${url}`);
  });
