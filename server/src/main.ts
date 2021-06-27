import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as GlobalConfig from './GlobalConfig';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  //CORS proxy to avoid “No Access-Control-Allow-Origin header” problems
  app.enableCors();

  console.log("Server running in port:", GlobalConfig.PORT);
  
  await app.listen(GlobalConfig.PORT);
}
bootstrap();
