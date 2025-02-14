import type { HttpBindings } from "@hono/node-server";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "@tigawanna/hono-pino";
import type { Logger } from "pino";

import type { UserJWTPayload } from "@/api/users/schema";

export interface AppBindings {
  Variables: {
    "logger": PinoLogger;
    "viewer": UserJWTPayload;
  };
  Bindings: HttpBindings;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
