import express from "express";
import signupRoute from "./signup.ts";
import signinRoute from "./signin.ts";
import verifyEmailRoute from "./verify-emai.ts";

const router = express.Router();
router.use(signupRoute);
router.use(signinRoute);
router.use(verifyEmailRoute);

export default router;
