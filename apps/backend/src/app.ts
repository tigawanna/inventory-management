import "dotenv/config";
import express, { type Router } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";
import * as middlewares from "./middlewares.ts";
import api from "./api/index.ts";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/**/*.ts"], // files containing annotations as above
};

// declare module "express" {
//   interface Request {
//     cookies?: { [key: string]: string };
//   }
// }

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

app.use(cors({}));

app.use(express.json());
app.use("/api/v1", api);
app.get("/docs", (req, res) => {
  const openapiSpecification = swaggerJsdoc(swaggerJsdocOptions);
  res.json(openapiSpecification);
});

app.use(
  "/ui",
  apiReference({
    spec: {
      theme: "saturn",
      url: "/docs",
    },
  }) as unknown as Router,
);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
