import { createRouter } from "@/lib/create-app";

import { signupUserHandler, signupUserRoute } from "./signup.route";

const router = createRouter()
  .openapi(signupUserRoute, signupUserHandler);
//   .openapi(inventoryCreateRoute, inventoryCreateHandler);

export default router;
