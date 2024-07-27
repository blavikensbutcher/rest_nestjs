import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: 'set-cookie',
    // origin: 'http://localhost:3000',
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Task manager')
    .setDescription('Task manager API routing')
    .addBearerAuth()
    .addApiKey()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
