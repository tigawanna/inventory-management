import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { root } from "@/controllers";
import { openapi, fromTypes } from "@elysiajs/openapi";

const app = new Elysia({ adapter: node() })
  .use(
    openapi({
      references: fromTypes(),
    })
  )
  .use(root)
  .listen(4000, ({ url }) => {
    console.log(`🦊 Elysia is running at ${url}`);
  });
