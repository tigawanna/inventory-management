import { OpenAPIHono } from "@hono/zod-openapi";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { notFound, serveEmojiFavicon } from "stoker/middlewares";

import { allowedOrigins, corsHeaders } from "@/middlewares/cors-middlewares";
import { onHonoError } from "@/middlewares/error-middleware";
import { pinoLogger } from "@/middlewares/loggermiddleware";

import type { AppBindings, AppOpenAPI } from "./types";

import { defaultHonoOpenApiHook } from "./configure-open-api";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHonoOpenApiHook,

  });
}

export function createApp() {
  const app = createRouter();
    app.use("*", cors({
      origin:[...allowedOrigins],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS","PUT","DELETE","PATCH"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }));
  app.use(requestId());
  // @ts-expect-error its fine
  app.use(pinoLogger());
  app.use("/api/*", (c, next) => corsHeaders(c, next));
  app.use(contextStorage());
  app.use(serveEmojiFavicon("📝"));
  app.notFound(notFound);
  app.onError(onHonoError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
