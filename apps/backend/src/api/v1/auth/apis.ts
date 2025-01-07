import express from 'express';
import signupRoute from './signup.ts';

const router = express.Router();
router.use("/signup", signupRoute);


export default router;
