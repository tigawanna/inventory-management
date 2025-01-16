import { configureOpenAPI } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";
import { AppBindings } from "./lib/types";
import { authenticateUserMiddleware } from "./middlewares/auth-middl-ware";
import { getCurrentContext } from "./middlewares/context-middleware";
import { allroutes } from "./routes/all-routes";
import { contextStorage, getContext } from "hono/context-storage";
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from "hono/cookie";

const app = createApp();
app.use(async (c, next) => {
  await authenticateUserMiddleware(c, next);
});
app.use(contextStorage());
configureOpenAPI(app);

allroutes.forEach((route) => {
  app.route("/", route);
});
export type AppType = (typeof allroutes)[number];

export default app;
