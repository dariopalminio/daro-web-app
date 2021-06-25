
export default interface IEmailSender {
    sendEmail(subject: string, toEmail: string, htmlContent: string): Promise<boolean>;
  }