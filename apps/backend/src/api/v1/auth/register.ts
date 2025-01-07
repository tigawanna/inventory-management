import { returnValidationData } from "@/utils/zod-errors.ts";
import express from "express";
import { z } from "zod";
const router = express.Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/", (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error.flatten(),
      data: returnValidationData(error),
    });
  }
  const { name, email, password } = data;
  console.log(name, email, password);

  res.json({
    message: "its register time",
  });
});

export default router;
