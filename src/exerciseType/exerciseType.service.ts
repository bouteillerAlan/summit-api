import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseType } from './exerciseType.entity';
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ExerciseTypeService {
  constructor(
    @InjectRepository(ExerciseType)
    private readonly exerciseTypeRepository: Repository<ExerciseType>
  ) {}

  async findAll(): Promise<ExerciseType[]> {
    return this.exerciseTypeRepository.find();
  }

  async findOne(id: number): Promise<ExerciseType | null> {
    return this.exerciseTypeRepository.findOneBy({ id });
  }

  async addOne(exerciseType: QueryDeepPartialEntity<ExerciseType>): Promise<void> {
    await this.exerciseTypeRepository.insert(exerciseType);
  }

  async deleteOne(id: number): Promise<void> {
    await this.exerciseTypeRepository.delete(id);
  }
}
