import { envVariables } from "@/env.ts";
import { createTransport } from "nodemailer";

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
      enter the code below to verify your email: ${token}
    } `,
    },

    resetpassword: {
      subject: "Reset your password",
      from,
      to,
      text: ` 
      Reset your password:
      enter the code below to reset your password: ${token}
    } `,
    },
  };
}

export interface SendMailResponse {
  message: string;
  error: boolean;
  success: boolean;
}

export interface SendEmailVersionProps {
  token: string;
  mail_to: string;
  type: "verifyemail" | "resetpassword";
}
export async function sendEmailwithBrevoSMTP({
  token,
  type,
  mail_to,
}: SendEmailVersionProps) {
  const { BREVO_KEY, EMAIL_FROM } = envVariables;

  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: mail_to,
      pass: BREVO_KEY,
    },
  });

  const mailOptions = emailTemplates({
    from: EMAIL_FROM,
    to: mail_to,
    token,
  })[type];
  async function asyncsendMail() {
    return new Promise<SendMailResponse>((resolve) => {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          resolve({
            message: "Something went wrong",
            error: info,
            success: false,
          });
        } else {
          resolve({
            message: "Successfully sent, Thank you!",
            error: false,
            success: true,
          });
        }
      });
    });
  }

  return asyncsendMail();
}
