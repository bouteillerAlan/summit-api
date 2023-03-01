import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingModule } from './training/training.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseTypeModule } from './exerciseType/exerciseType.module';
import { TrainingTypeModule } from './trainingType/trainingType.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'summit',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error']
    }),
    TrainingModule,
    TrainingTypeModule,
    ExerciseModule,
    ExerciseTypeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
