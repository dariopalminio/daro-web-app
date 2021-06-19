import { Injectable } from '@nestjs/common';
import * as GlobalConfig from '../config/GlobalConfig';
import { ContactDTO } from '../model/dto/ContactDTO.dto';
const nodemailer = require("nodemailer");



@Injectable()
export class NotificationService {
  //WebShopAPI=wmxhrhnmaiuzlgui

  async sendContactEmail(contactDTO: ContactDTO): Promise<string> {
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
      //const r = this.sendEmail("Subject Test", contactDTO.email, contentHTML);
      return "OK!!!!!!";
    } catch (e) {
      return "Bad";
    };
  };

  async sendEmail(subject: string, toEmail: string, contentHTML: string): Promise<string> {

    let transporter = nodemailer.createTransport({
      host: GlobalConfig.email.host,
      port: GlobalConfig.email.port,
      secure: true,
      auth: {
        user: GlobalConfig.email.user,
        pass: GlobalConfig.email.pass
      },
    });
    try {
      let info = await transporter.sendMail({
        from: GlobalConfig.email.from, // sender address,
        to: toEmail,
        subject: subject,
        html: contentHTML
      });

      return 'OK!!!';
    } catch (error) {
      throw error;
    };
  };
};
