import { Injectable } from '@nestjs/common';
import * as GlobalConfig from '../config/global-config';
import IEmailSender from '../../domain/output-port/email-sender.interface';
import * as path from 'path';

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-handlebars');

@Injectable()
export class EmailSmtpSenderAdapter implements IEmailSender {

  smtpTransporter: any;
  templatePath: string;

  constructor(
  ) {
    // Configuración transportador NodeMailer
    if (!GlobalConfig.email.USER ||
      !GlobalConfig.email.PASS ||
      !GlobalConfig.email.HOST ||
      !GlobalConfig.email.PORT
    ) throw Error("SmtpOptions param is empty!");

    this.templatePath = '../../../src/domain/emails/templates/';

  };

  /**
   * Get Smtp Options for send email using nodemailer.
   * @returns 
   */
  private getSmtpOptions() {
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

  /**
   * Send email using external email provider and Simple Mail Transfer Protocol.
   * 
   * @param subject 
   * @param toEmail 
   * @param contentHTML 
   * @returns sentInfo = {
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
  async sendEmail(subject: string, toEmail: string, htmlContent: string): Promise<any> {

    try {

      const email = {
        from: GlobalConfig.email.FROM, // sender address,
        to: toEmail,
        subject: subject,
        html: htmlContent
      };

      this.smtpTransporter = nodemailer.createTransport(this.getSmtpOptions());
      const sentInfo: any = await this.smtpTransporter.sendMail(email);
      console.log("sentInfo:");
      console.log(sentInfo);

      return sentInfo;
    } catch (error) {
      console.log("Nodemailer error!! Can not send email.");
      throw error;
    };
  };

  async sendEmailFromOject(obj: any): Promise<any> {
    try {
      return await this.smtpTransporter.sendMail(obj);
    } catch (error) {
      console.log("Nodemailer error!! Can not send email.");
      throw error;
    }
  };

  /**
   * Send email using template
   * 
   * https://github.com/accimeesterlin/nodemailer-examples/tree/master/sendTemplates
   * 
   * @param subject 
   * @param toEmail addressee to send
   * @param templateName file name located in templates folder
   * @param contexts params to insterts in template
   * @param locale language
   */
  async sendEmailWithTemplate(subject: string, toEmail: string, templateName: string, contexts: any, locale: string): Promise<any> {
    try {

      const handlebarsConfig = {
        viewEngine: {
          extName: '.handlebars',
          layoutsDir: path.resolve(__dirname, this.templatePath + locale),
          defaultLayout: templateName,
          partialsDir: path.resolve(__dirname, this.templatePath + locale)
        },
        viewPath: path.resolve(__dirname, this.templatePath + locale),
      };

      this.smtpTransporter = nodemailer.createTransport(this.getSmtpOptions());
      this.smtpTransporter.use('compile', hbs(handlebarsConfig));

      let mailOptions = {
        from: GlobalConfig.email.FROM, // sender address,
        to: toEmail, // TODO: email receiver
        subject: subject,
        template: templateName,
        context: contexts
      };
      
      const sentInfo: any = await this.smtpTransporter.sendMail(mailOptions);
      console.log("sentInfo:", sentInfo);
      return sentInfo;
    } catch (error) {
      console.log("Nodemailer error!! Can not send email. ERROR: ", error);
      throw error;
    };
  }

};
