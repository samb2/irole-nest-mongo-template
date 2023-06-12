import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService); // Obtain the ConfigService instance
    app.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    );
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('Template')
        .setDescription('The Template API description')
        .setVersion('1.0')
        .addTag('users')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const port: number = configService.get<number>('PORT'); // Retrieve the port number from the environment variables
    await app.listen(port);
}

bootstrap();
