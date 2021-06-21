import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as GlobalConfig from './state/config/GlobalConfig';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  console.log("Server running in port:", GlobalConfig.PORT);

  //CORS proxy to avoid “No Access-Control-Allow-Origin header” problems
  app.enableCors();

  await app.listen(GlobalConfig.PORT);
}
bootstrap();
