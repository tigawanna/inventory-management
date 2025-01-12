import { envVariables } from "@/env.ts";
import { createTransport } from "nodemailer";

export interface SendMailResponse {
  message: string;
  error: boolean;
  success: boolean;
  info: any;
}

export interface SendEmailVersionProps {
  mail_to: string;
  subject: string;
  body: string;
}
export async function sendEmailwithBrevo({
  subject,
  body,
  mail_to,
}: SendEmailVersionProps) {
  const { BREVO_USER, BREVO_API_KEY,EMAIL_FROM } = envVariables;
  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: BREVO_USER,
      pass: BREVO_API_KEY,
    },
  });
  const mailOptions = {
    subject,
    from: EMAIL_FROM,
    to: mail_to,
    text: body,
  };

  async function asyncsendMail() {
    return new Promise<SendMailResponse>((resolve) => {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          resolve({
            message: "Something went wrong",
            error: info,
            info,
            success: false,
          });
        } else {
          resolve({
            message: "Successfully sent, Thank you!",
            info,
            error: false,
            success: true,
          });
        }
      });
    });
  }

  return asyncsendMail();
}
