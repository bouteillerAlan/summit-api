import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './training/training.entity';
import { TrainingModule } from './training/training.module';
import { ExerciseModule } from './exercise/exercise.module';
import { Exercise } from './exercise/exercise.entity';
import { ExerciseType } from './exerciseType/exerciseType.entity';
import { ExerciseTypeModule } from './exerciseType/exerciseType.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'summit',
      entities: [Training, Exercise, ExerciseType],
      synchronize: true
    }),
    TrainingModule,
    ExerciseModule,
    ExerciseTypeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
