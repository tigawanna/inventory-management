import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import { envVariables } from "@/env";

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: envVariables.LOG_LEVEL || "info",
      },
      envVariables.NODE_ENV === "production" ? undefined : pretty({
        colorize: true,
      }),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
      minimalMessage:true,
      // minimalMessage:(b,c)=>{
      //   return {
      //     extra:"i want to log this too",
      //     ...b,
      //   }
      // }
    },
  });
}

