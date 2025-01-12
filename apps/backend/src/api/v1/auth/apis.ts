import express from "express";
import { AuthService } from "@/services/auth-service.ts";
import {
  meRoute,
  refreshTokenRoute,
  logoutRoute,
  requestEmailVerificayionRoute,
  verifyEmailRoute,
} from "./identity.ts";
import { loginSuperUserRoute, loginUserRoute } from "./signin.ts";
import { forgotPasswordRoute, resetPasswordRoute } from "./password.ts";
import { registerUserRoute } from "./signup.ts";

const router = express.Router();
const authService = new AuthService();
// signin
loginUserRoute(router, authService);
// super-signin
loginSuperUserRoute(router, authService);
// signup
registerUserRoute(router, authService);
// me
meRoute(router, authService);
// forgot-password
forgotPasswordRoute(router, authService);
// reset-password
resetPasswordRoute(router, authService);
// refresh token
refreshTokenRoute(router, authService);
// logout
logoutRoute(router, authService);
// verify-email
verifyEmailRoute(router, authService);
//  requets email verification
requestEmailVerificayionRoute(router, authService);

export default router;
