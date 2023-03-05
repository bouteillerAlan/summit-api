import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

/**
 * bootstrap the app
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true
  }));

  // for custom decorator in class validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // swagger configuration and options
  const config = new DocumentBuilder()
    .setTitle('Summit')
    .setDescription('The Summit nestjs main api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swag', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      filter: true
    }
  });

  await app.listen(3000);
}

/* eslint-disable no-console */
bootstrap()
  .then((): void => { console.log('started'); })
  .catch(e => { console.log('error', e); });
/* eslint-enable no-console */
