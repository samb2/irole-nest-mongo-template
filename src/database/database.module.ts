import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(), // Import the ConfigModule
        MongooseModule.forRootAsync({
            inject: [ConfigService], // Inject the ConfigService
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('DATABASE_URL'), // Use the ConfigService to retrieve the database URL
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
