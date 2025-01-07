import express from "express";
import signupRoute from "./signup.ts";
import signinRoute from "./signin.ts";
import verifyEmailRoute from "./verify-emai.ts";

const router = express.Router();
router.use("/signup", signupRoute);
router.use("/signin", signinRoute);
router.use("/verify-email/:token", verifyEmailRoute);

export default router;
