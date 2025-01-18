import { createRouter } from "@/lib/create-app";

import { signinUserHandler, signinUserRoute } from "./signin.route";
import { signupUserHandler, signupUserRoute } from "./signup.route";

const router = createRouter()
  .openapi(signupUserRoute, signupUserHandler)
  .openapi(signinUserRoute, signinUserHandler);
//   .openapi(inventoryCreateRoute, inventoryCreateHandler);

export default router;
