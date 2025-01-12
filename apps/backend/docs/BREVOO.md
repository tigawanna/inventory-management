
# Brevo smtp emails to other gmail accounts silently failing , verif ied domain to the rescue

Nodemailer with Brevo is an excellent combination for sending free emails (up to 300 per day) within your applications. However, a recent change implemented by Gmail and Yahoo has silently disrupted some functionality, preventing emails from reaching recipients.

To address this issue, Brevo recommends attaching a domain or subdomain to your account and verifying it. This verification process ensures compliance with the latest email sending requirements set forth by Gmail and Yahoo [brevo help link](https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-and-Yahoo-s-requirements-for-email-senders).


- Go to the [sender's list](https://app.brevo.com/senders/list) ![sender's list](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/backend/docs/brevo-sendres.png)

- [Under Senders, Domains & Dedicated IPs](https://app.brevo.com/senders/domain/list) ![senders list domain](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/backend/docs/brevo-sendres.png)

- Click on the "Add domain" button and fllow the automated steps to add your domain and verify it with brevo

after that 

you can now send emails like 

```ts
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
  mail_from: string;
  subject: string;
  body: string;
}
export async function sendEmailwithSMTP({
  subject,
  body,
  mail_from,
  mail_to,
}: SendEmailVersionProps) {
  const { BREVO_USER, BREVO_API_KEY,EMAIL_FROM } = envVariables;
  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
     // these didn't change 
    // use the ones you genrated here : https://app.brevo.com/settings/keys/smtp    
      user: BREVO_USER,
      pass: BREVO_API_KEY,
    },
  });
  const mailOptions = {
    subject,
    // this had to be the email you registered with brevo (still works  )
    // from: "email@gmail.com",
    // but now you can also do this app-name@subdomain.domain.tld
    from: "app-name@example.com",
    //  or using a subdomain from: "app-name@mail.example.com",
    // and your recipient will see the sender as app-name
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

```
