import { createRouter } from "@/lib/create-app";

import { requestEmailVerificationHandler, requestEmailVerificationRoute } from "./request-email-verification.route";
import { requestPasswordResetHandler, requestPasswordResetRoute } from "./request-password-reset";
import { signinUserHandler, signinUserRoute } from "./signin.route";
import { signupUserHandler, signupUserRoute } from "./signup.route";
import { emailVerificationHandler, emailVerificationRoute } from "./verify-email.route";

const router = createRouter()
  .openapi(signupUserRoute, signupUserHandler)
  .openapi(emailVerificationRoute, emailVerificationHandler)
  .openapi(requestEmailVerificationRoute, requestEmailVerificationHandler)
  .openapi(signinUserRoute, signinUserHandler)
  .openapi(requestPasswordResetRoute, requestPasswordResetHandler);
//   .openapi(inventoryCreateRoute, inventoryCreateHandler);

export default router;
