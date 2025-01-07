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
}

export interface SendEmailVersionProps {
  token: string;
  mail_to: string;
  type: "verifyemail" | "resetpassword";
}
export async function sendEmailwithSMTP({
  token,
  type,
  mail_to,
}: SendEmailVersionProps) {
  const { EMAIL_FROM, MAILTRAP_API_KEY, MAILTRAP_USER } = envVariables;

  // const transporter = createTransport({
  //   host: "smtp-relay.brevo.com",
  //   port: 587,
  //   auth: {
  //   user: EMAIL_FROM,
  //     pass: BREVO_KEY,
  //   },
  // });
  const transporter = createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_API_KEY,
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
