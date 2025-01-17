import { contextStorage } from "hono/context-storage";
import { requestId } from 'hono/request-id';

import { configureOpenAPI } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";
import { authenticateUserMiddleware } from "./middlewares/auth-middl-ware";
import { allroutes } from "./routes/all-routes";

const app = createApp();

configureOpenAPI(app);

allroutes.forEach((route) => {
  app.route("/", route);
});
export type AppType = (typeof allroutes)[number];

export default app;
