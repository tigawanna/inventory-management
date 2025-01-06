import { AuthService } from "@/services/auth-service.ts";
import express from "express";
import { loginUserRoute } from "./login.ts";
import { registerUserRoute } from "./register.ts";
import { meRoute, verifyUserTokenRoute } from "./identity.ts";
import { forgotPasswordRoute, resetPasswordRoute } from "./password.ts";

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
