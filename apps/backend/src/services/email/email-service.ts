import { envVariables } from "@/env.ts";
import { sendEmailwithBrevo } from "./brevo-nodemailer.ts";
import { emailTemplates } from "./utils.ts";

interface SendEmailProps {
  token: string;
  mail_to: string;
  type: "verifyemail" | "resetpassword";
}

export class EmailService {
  async sendEmail({ mail_to, token, type }: SendEmailProps) {
    const { EMAIL_FROM } = envVariables;
    const mailOptions = emailTemplates({
      from: EMAIL_FROM,
      to: mail_to,
      token,
    })[type];
    return sendEmailwithBrevo({
      body: mailOptions.text,
      mail_to,
      subject: mailOptions.subject,
    });
  }
}
