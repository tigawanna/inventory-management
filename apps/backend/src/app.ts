import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares.ts";
import v1Api from "./api/v1/index.ts";
import cookieParser from "cookie-parser";
import type { UserJWTPayload } from "./schemas/user-schema.ts";

declare global {
  namespace Express {
    interface Request {
      user: UserJWTPayload;
    }
  }
}



const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
        connectSrc: ["'self'", "cdn.jsdelivr.net"],
      },
    },
  }),
);

app.use(cors({ origin: ["*"] }));
app.use(express.json());
app.use(express.static("openapi.json"));
app.use("/api/v1", v1Api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
