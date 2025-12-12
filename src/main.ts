import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.getHttpAdapter().get('/health', (req, res) => res.send('OK'));
  
  const port = process.env.PORT || 3000;
  if (!port) throw new Error('PORT environment variable is not set');

  await app.listen(+port, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${port}`);
}

void bootstrap();