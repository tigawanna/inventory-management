interface SendEmailProps {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  async sendEmail({ to, body }: SendEmailProps): Promise<{ status: string }> {
    return new Promise<{ status: string }>((resolve) => {
      // Simulate email sending
      setTimeout(() => {
        console.log(`Email sent to ${to} with body: ${body}`);
        resolve({
          status: "Email sent successfully",
        });
      }, 1000);
    });
  }
}
