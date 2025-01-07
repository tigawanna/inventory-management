import "dotenv/config";
import express, { type Router } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";
import * as middlewares from "./middlewares.ts";
import api from "./api/index.ts";
import cookieParser from "cookie-parser";


// declare module "express" {
//   interface Request {
//     cookies?: { [key: string]: string };
//   }
// }


const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  "/reference",
  apiReference({
    spec: {
      theme: "saturn",
      // Put your OpenAPI url here:
      url: "/openapi.json",
    },
  }) as unknown as Router,
);
app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
