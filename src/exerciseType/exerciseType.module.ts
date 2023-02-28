import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseTypeService } from './exerciseType.service';
import { ExerciseTypeController } from './exerciseType.controller';
import { ExerciseType } from './exerciseType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseType])],
  providers: [ExerciseTypeService],
  controllers: [ExerciseTypeController]
})

export class ExerciseTypeModule {}
