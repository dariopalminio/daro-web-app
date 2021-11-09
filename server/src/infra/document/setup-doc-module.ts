import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import * as fs from 'fs';

/**
 * Setup Swagger to NestJS
 * @param app 
 */
export const setupDocModule = (app: any) => {
  try {
    const docConfig = new DocumentBuilder()
      .setTitle('Api doc ' + process.env.SERVER_BFF_APP_NAME)
      .setDescription('Api as backend')
      //.addBearerAuth()
      .setVersion(process.env.SERVER_BFF_VERSION)
      .addTag(process.env.SERVER_BFF_APP_NAME)
      .build();
    const document = SwaggerModule.createDocument(app, docConfig, {
      ignoreGlobalPrefix: false,
    });
    //fs.writeFileSync('spec/swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup(`${process.env.SERVER_BFF_APP_PREFIX_ROUTE}/doc/swagger`, app, document);
  } catch (error) {
    console.log("Error loadin Swagger...");
    console.log(error);
  }
};