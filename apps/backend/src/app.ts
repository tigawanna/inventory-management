import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares.ts";
import v1Api from "./api/v1/index.ts";
import cookieParser from "cookie-parser";
import type { UserJWTPayload } from "./schemas/user-schema.ts";
import { allowedOrigins, corsHeaders } from "./middleware/cors-stuff.ts";
import { rateLimitMiddleware } from "./middleware/rate-limit.ts";
import requestIp from "request-ip"

declare global {
  namespace Express {
    interface Request {
      user: UserJWTPayload;
    }
  }
}


const app = express();

app.use(morgan("dev"));
app.use(requestIp.mw());
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
app.use(corsHeaders);
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use((...props)=>rateLimitMiddleware(...props,["/api/v1"]));
app.get("/", (req, res) => {
  res.json({ message: "welcome to v1 api" });
})
app.use("/api/v1", v1Api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
