import { envVariables } from "@/env.ts";
import { sendEmailwithBrevo } from "@/services/email/brevo-nodemailer.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import express from "express";
import { z } from "zod";

const router = express.Router();

router.post("/brevo", async (req, res) => {
  const { success, data, error } = z
    .object({
      email: z.string().email(),
      subject: z.string(),
      body: z.string(),
    })
    .safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  const mailerResponse = await sendEmailwithBrevo({
    mail_to: data.email,
    subject: data.subject,
    body: data.body,
  });
  if(mailerResponse.error){
    return res.status(400).json({
      message: "Something went wrong",
      error: mailerResponse.error,
    });
  }
  return res.json({ message: "Email sent successfully", data: mailerResponse });
});

export default router;
