import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as GlobalConfig from './state/config/GlobalConfig';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Run...");
  console.log(GlobalConfig.PORT);
  await app.listen(GlobalConfig.PORT);
}
bootstrap();
