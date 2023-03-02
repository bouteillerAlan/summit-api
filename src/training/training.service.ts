import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './training.entity';
import { type CreateTrainingDto } from './training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>
  ) {}

  async findAll(): Promise<Training[]> {
    return this.trainingRepository.find();
  }

  async findOne(id: number): Promise<Training | null> {
    return this.trainingRepository.findOneBy({ id });
  }

  async addOne (training: CreateTrainingDto): Promise<void> {
    await this.trainingRepository.insert(training);
  }

  async deleteOne(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }
}
