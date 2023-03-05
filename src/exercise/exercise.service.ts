import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) {}

  async exist(whereOption: Record<string, string | number>): Promise<boolean> {
    return this.exerciseRepository.exist({ where: whereOption });
  }

  async findAll(userId?: number, trainingId?: number): Promise<Exercise[]> {
    const query: Record<string, number> = {};
    if (userId !== undefined) query.owner = userId;
    if (trainingId !== undefined) query.training = trainingId;
    return this.exerciseRepository.findBy(query);
  }

  async findOne(id: number, userId?: number): Promise<Exercise | null> {
    const query: Record<string, number> = { id };
    if (userId !== undefined) query.owner = userId;
    return this.exerciseRepository.findOneBy(query);
  }

  async addOne(exercise: Omit<Exercise, 'id'>): Promise<void> {
    await this.exerciseRepository.insert(exercise);
  }

  async deleteOne(id: number): Promise<void> {
    await this.exerciseRepository.delete(id);
  }
}
