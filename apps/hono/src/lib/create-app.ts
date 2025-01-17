import { OpenAPIHono } from "@hono/zod-openapi";
import { contextStorage } from "hono/context-storage";
import { requestId } from "hono/request-id";
import { notFound, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { authenticateUserMiddleware } from "@/middlewares/auth-middl-ware";
import { onHonoError } from "@/middlewares/error-middleware";
import { pinoLogger } from "@/middlewares/loggermiddleware";

import type { AppBindings, AppOpenAPI } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export function createApp() {
  const app = createRouter();
  app.use(requestId());
  app.use(pinoLogger());
  app.use(contextStorage());
  app.use(async (c, next) => {
    await authenticateUserMiddleware(c, next);
  });
  app.use(serveEmojiFavicon("📝"));
  app.notFound(notFound);
  app.onError(onHonoError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
