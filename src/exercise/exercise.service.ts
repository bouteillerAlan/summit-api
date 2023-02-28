import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async findOne(id: number): Promise<Exercise | null> {
    return this.exerciseRepository.findOneBy({ id });
  }

  async addOne(exercise: QueryDeepPartialEntity<Exercise>): Promise<void> {
    await this.exerciseRepository.insert(exercise);
  }

  async deleteOne(id: number): Promise<void> {
    await this.exerciseRepository.delete(id);
  }
}