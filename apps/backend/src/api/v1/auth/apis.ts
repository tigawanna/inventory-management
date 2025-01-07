import express from "express";
import { AuthService } from "@/services/auth-service.ts";
import { verifyUserTokenRoute, meRoute } from "./identity.ts";
import { loginUserRoute } from "./login.ts";
import { forgotPasswordRoute, resetPasswordRoute } from "./password.ts";
import { registerUserRoute } from "./register.ts";

const router = express.Router();
const authService = new AuthService();
// login
loginUserRoute(router, authService);
// register
registerUserRoute(router, authService);
// verify
verifyUserTokenRoute(router, authService);
// me
meRoute(router, authService);
// forgot password
forgotPasswordRoute(router, authService);
// reset password
resetPasswordRoute(router, authService);

export default router;
