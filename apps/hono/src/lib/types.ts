import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

import type { UserJWTPayload } from "@/api/v1/users/schema";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    viewer: UserJWTPayload;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
