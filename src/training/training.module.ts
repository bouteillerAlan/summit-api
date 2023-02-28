import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { Training } from './training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  providers: [TrainingService],
  controllers: [TrainingController]
})

export class TrainingModule {}
