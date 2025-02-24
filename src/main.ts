import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response.interceptor';
// import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const config = new DocumentBuilder()
    .setTitle('test-meeting')
    .setDescription('api')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
