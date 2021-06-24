import { Injectable } from '@nestjs/common';
import * as GlobalConfig from '../../GlobalConfig';
import { ContactDTO } from '../model/valueo_bject/ContactDTO.dto';

const nodemailer = require("nodemailer");

@Injectable()
export class NotificationService {


  /**
   * Send contact email 
   * @param contactDTO 
   * @returns 
   */
  async sendContactEmail(contactDTO: ContactDTO): Promise<any> {
    const contentHTML = `
    We will contact you shortly...
    <h1>User Information</h1>
    <ul>
        <li>Username: ${contactDTO.name}</li>
        <li>User Email: ${contactDTO.email}</li>
        <li>PhoneNumber: ${contactDTO.phone}</li>
    </ul>
    <p>Message: ${contactDTO.message}</p>
    `;

    try {
      return this.sendEmail("Subject Test", contactDTO.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

  /**
   * Send email using external email provider and Simple Mail Transfer Protocol.
   * 
   * @param subject 
   * @param toEmail 
   * @param contentHTML 
   * @returns 
   */
  async sendEmail(subject: string, toEmail: string, contentHTML: string): Promise<any> {

    try {
      const smtpOptions = this.getSmtpOptions();

      // Configuración transportador NodeMailer
      const smtpTransporter = nodemailer.createTransport(smtpOptions);

      const email = {
        from: GlobalConfig.email.FROM, // sender address,
        to: toEmail,
        subject: subject,
        html: contentHTML
      };

      const sentInfo = await smtpTransporter.sendMail(email);
      console.log("sentInfo:");
      console.log(sentInfo);
      return sentInfo;

    } catch (error) {
      console.log("nodemailer error!!");
      throw error;
    };
  };

  /**
   * Get Smtp Options for send email using nodemailer.
   * @returns 
   */
  private getSmtpOptions(){
    if (!GlobalConfig.email.USER ||
      !GlobalConfig.email.PASS ||
      !GlobalConfig.email.HOST ||
      !GlobalConfig.email.PORT
      ) 
    throw Error("SmtpOptions param is empty!");
    return {
      host: GlobalConfig.email.HOST,
      port: GlobalConfig.email.PORT,
      secure: true,
      auth: {
        user: GlobalConfig.email.USER,
        pass: GlobalConfig.email.PASS
      },
    };
  };

};
