import { createTransport } from "nodemailer";

import { envVariables } from "@/env";

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

interface EmailTemplateProps {
  from: string;
  to: string;
  token: string;
}
export function emailTemplates({ from, to, token }: EmailTemplateProps) {
  return {
    verifyemail: {
      subject: "Verify your email",
      from,
      to,
      text: ` 
      Verify your email:
      enter the code below to verify your email: 
      <h1>${token}</h1>
    `,
    },

    resetpassword: {
      subject: "Reset your password",
      from,
      to,
      text: ` 
      Reset your password:

      enter the code below to reset your password: 
      <h1>${token}</h1>
    `,
    },
  };
}

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
  const { BREVO_USER, BREVO_API_KEY, EMAIL_FROM } = envVariables;
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
        }
        else {
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
