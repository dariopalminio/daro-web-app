import { Injectable } from '@nestjs/common';
import * as GlobalConfig from '../../GlobalConfig';
import IEmailSender from '../../domain/output/port/IEmailSender';

const nodemailer = require("nodemailer");

export class EmailSmtpSenderAdapter implements IEmailSender{


  /**
   * Send email using external email provider and Simple Mail Transfer Protocol.
   * 
   * @param subject 
   * @param toEmail 
   * @param contentHTML 
   * @returns 
   */
  async sendEmail(subject: string, toEmail: string, htmlContent: string): Promise<boolean> {

    try {
      const smtpOptions = this.getSmtpOptions();

      // Configuración transportador NodeMailer
      const smtpTransporter = nodemailer.createTransport(smtpOptions);

      const email = {
        from: GlobalConfig.email.FROM, // sender address,
        to: toEmail,
        subject: subject,
        html: htmlContent
      };

      const sentInfo = await smtpTransporter.sendMail(email);
      console.log("sentInfo:");
      console.log(sentInfo);
      /**
sentInfo = {
  accepted: [ 'dachoy@stefanini.com' ],
  rejected: [],
  envelopeTime: 529,
  messageTime: 671,
  messageSize: 552,
  response: '250 2.0.0 OK  1624577213 c4sm3749797qkj.81 - gsmtp',
  envelope: { from: 'dariopalminio@gmail.com', to: [ 'dachoy@stefanini.com' ] },
  messageId: '<eb69f50e-caba-2c06-ce16-7b76e6cd9241@gmail.com>'
}
       */
      return sentInfo ? true : false;

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
