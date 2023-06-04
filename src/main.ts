import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService); // Obtain the ConfigService instance
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    const port: number = configService.get<number>('PORT'); // Retrieve the port number from the environment variables
    await app.listen(port);
}

bootstrap();
