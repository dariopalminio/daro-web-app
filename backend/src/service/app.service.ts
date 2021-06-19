import { Injectable } from '@nestjs/common';
import * as GlobalConfig from '../config/GlobalConfig';

const nodemailer = require("nodemailer");


@Injectable()
export class AppService {
  //WebShopAPI=wmxhrhnmaiuzlgui

  getHello(): string {
    return 'Hello World! This is web shop backend server v1.0';
  }

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

    let info = await transporter.sendMail({
      from: GlobalConfig.email.from, // sender address,
      to: toEmail,
      subject: subject,
      html: contentHTML
    });

    return 'OK!!!';
  } catch(error) {
    throw error;
  };

};
