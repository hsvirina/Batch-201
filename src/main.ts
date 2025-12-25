import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

dotenv.config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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

  // Health check endpoint
  server.get('/health', (req: Request, res: Response) => {
    res.send('OK');
  });

  const port = process.env.PORT || 3000;
  await app.listen(+port, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${port}`);
}

void bootstrap();
