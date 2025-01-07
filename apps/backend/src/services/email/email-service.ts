import { sendEmailwithBrevoSMTP } from "./utils.ts";

interface SendEmailProps {
  token: string;
  mail_to: string;
  type: "verifyemail" | "resetpassword";
}

export class EmailService {
  async sendEmail({
    mail_to,
    token,
    type,
  }: SendEmailProps) {
    return sendEmailwithBrevoSMTP({ token, type, mail_to });
  }
}
