import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('START APPLICATION ON PORT:', process.env.PORT ?? 3001);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
