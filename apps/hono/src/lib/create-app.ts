import { OpenAPIHono } from "@hono/zod-openapi";
import { contextStorage } from "hono/context-storage";
import { requestId } from "hono/request-id";
import { notFound, serveEmojiFavicon } from "stoker/middlewares";

import { corsHeaders } from "@/middlewares/cors-middlewares";
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
  app.use(requestId());
  // @ts-expect-error its fine
  app.use(pinoLogger());
  //   app.use(async (c,next) => {
  //   c.set(
  //     'custom-logger',
  //     pino({
  //       browser: {
  //         formatters: {
  //           level(label, _number) {
  //             return { level: label.toUpperCase() };
  //           },
  //         },
  //         write: (o) => {
  //           console.log("write logger",o);
  //           // @ts-expect-error : the type is too genrric but shape matches
  //           const { time, level, msg } = o;
  //           const paddedLevel = level.padEnd(5, ' ');
  //           const requestId = c.var.requestId;
  //           console.log(`[${time}] ${paddedLevel} (${requestId}): ${msg}`);
  //         },
  //       },
  //       enabled: true,
  //       level: 'debug',
  //       timestamp: pino.stdTimeFunctions.isoTime,
  //     }),
  //   )
  //   // next()
  // }
  //   )
  app.use((c, next) => corsHeaders(c, next));
  app.use(contextStorage());
  // app.use(async (c, next) => {
  //   await authenticateUserMiddleware(c, next);
  // });
  app.use(serveEmojiFavicon("📝"));
  app.notFound(notFound);
  app.onError(onHonoError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
