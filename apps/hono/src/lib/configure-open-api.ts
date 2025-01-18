import type { Hook } from "@hono/zod-openapi";

import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json" with { type: "json" };
import HttpStatusCodes from "./status-codes";
import { returnValidationData } from "./zod";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Inventory API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}

export const defaultHonoOpenApiHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        data:returnValidationData(result.error),
        error: result.error,
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }
};
