import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL, // фронт
    credentials: true, // если нужны токены/куки — но это НЕ мешает
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.getHttpAdapter().get('/health', (req, res) => res.send('OK'));

  const port = process.env.PORT; // только из env
  if (!port) {
    throw new Error('PORT environment variable is not set');
  }

  // обязательно указываем хост 0.0.0.0 для Render
  await app.listen(+port, '0.0.0.0');

  console.log(`🚀 Server running on http://localhost:${port}`);
}

void bootstrap();
