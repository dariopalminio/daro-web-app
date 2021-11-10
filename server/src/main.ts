import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as GlobalConfig from './GlobalConfig';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupDocModule } from './infra/document/setup-doc-module';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  console.log('Nest factory start');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  //CORS proxy to avoid “No Access-Control-Allow-Origin header” problems
  app.enableCors();


  console.log('SET app route', GlobalConfig.PREFIX_ROUTE);
  app.setGlobalPrefix(GlobalConfig.PREFIX_ROUTE);

  console.log('load swagger module');
  setupDocModule(app);

  console.log("Server running in port:", GlobalConfig.PORT);
  await app.listen(GlobalConfig.PORT);
}
bootstrap();
