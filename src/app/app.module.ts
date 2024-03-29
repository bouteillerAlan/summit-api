import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingModule } from '../training/training.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { ExerciseTypeModule } from '../exerciseType/exerciseType.module';
import { TrainingTypeModule } from '../trainingType/trainingType.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('dbHost'),
        port: parseInt(configService.get('dbPort') as string, 10),
        username: configService.get('dbUser'),
        password: configService.get('dbPassword'),
        database: configService.get('dbName'),
        autoLoadEntities: true,
        synchronize: configService.get('dbSynchronize') === '1',
        logging: ['error']
      }),
      inject: [ConfigService]
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: process.env.NODE_ENV !== 'production'
          ? {
            target: 'pino-pretty',
            options: { colorize: true, levelFirst: true, translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z' }
          }
          : undefined
      }
    }),
    AuthModule,
    UserModule,
    TrainingModule,
    TrainingTypeModule,
    ExerciseModule,
    ExerciseTypeModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
