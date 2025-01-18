import { createRouter } from "@/lib/create-app";

import { currentUserHandler, currentUserRoute } from "./me.route";
import { requestEmailVerificationHandler, requestEmailVerificationRoute } from "./request-email-verification.route";
import { requestPasswordResetHandler, requestPasswordResetRoute } from "./request-password-reset";
import { resetPasswordHandler, resetPasswordRoute } from "./reset-password";
import { signinUserHandler, signinUserRoute } from "./signin.route";
import { signoutUserHandler, signoutUserRoute } from "./signout.route";
import { signupUserHandler, signupUserRoute } from "./signup.route";
import { emailVerificationHandler, emailVerificationRoute } from "./verify-email.route";

const router = createRouter()
  .openapi(signupUserRoute, signupUserHandler)
  .openapi(emailVerificationRoute, emailVerificationHandler)
  .openapi(requestEmailVerificationRoute, requestEmailVerificationHandler)
  .openapi(signinUserRoute, signinUserHandler)
  .openapi(requestPasswordResetRoute, requestPasswordResetHandler)
  .openapi(resetPasswordRoute, resetPasswordHandler)
  .openapi(signoutUserRoute, signoutUserHandler)
  .openapi(currentUserRoute, currentUserHandler);
//   .openapi(inventoryCreateRoute, inventoryCreateHandler);

export default router;
