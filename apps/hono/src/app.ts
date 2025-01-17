import { allroutes } from "./api/api-routes";
import { configureOpenAPI } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";

const app = createApp();

configureOpenAPI(app);

allroutes.forEach((route) => {
  app.route("/", route);
});
export type AppType = (typeof allroutes)[number];

export default app;
