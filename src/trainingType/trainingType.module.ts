import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingTypeService } from './trainingType.service';
import { TrainingTypeController } from './trainingType.controller';
import { TrainingType } from './trainingType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingType])],
  providers: [TrainingTypeService],
  controllers: [TrainingTypeController]
})

export class TrainingTypeModule {}
