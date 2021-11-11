import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as GlobalConfig from '../config/global-config';
//import * as fs from 'fs';

/**
 * Setup Swagger to NestJS
 * @param app 
 */
export const setupDocModule = (app: any) => {
  try {
    const docConfig = new DocumentBuilder()
      .setTitle('Api doc ' + GlobalConfig.APP_NAME)
      .setDescription('Api as backend')
      //.addBearerAuth()
      .setVersion(GlobalConfig.VERSION)
      .addTag(GlobalConfig.APP_NAME)
      .build();
    const document = SwaggerModule.createDocument(app, docConfig, {
      ignoreGlobalPrefix: false,
    });
    //fs.writeFileSync('spec/swagger-spec.json', JSON.stringify(document));
    console.log('Setup swagger in: ' + `${GlobalConfig.PREFIX_ROUTE}/doc`);
    SwaggerModule.setup(`${GlobalConfig.PREFIX_ROUTE}/doc`, app, document);
  } catch (error) {
    console.log("Error loadin Swagger...");
    console.log(error);
  }
};