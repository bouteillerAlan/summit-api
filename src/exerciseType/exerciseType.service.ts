import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseType } from './exerciseType.entity';

@Injectable()
export class ExerciseTypeService {
  constructor(
    @InjectRepository(ExerciseType)
    private readonly exerciseTypeRepository: Repository<ExerciseType>
  ) {}

  async exist(whereOption: Record<string, string | number>): Promise<boolean> {
    return this.exerciseTypeRepository.exist({ where: whereOption });
  }

  async findAll(userId?: number): Promise<ExerciseType[]> {
    const query: Record<string, number> = {};
    if (userId !== undefined) query.owner = userId;
    return this.exerciseTypeRepository.findBy(query);
  }

  async findOne(id: number, userId?: number): Promise<ExerciseType | null> {
    const query: Record<string, number> = { id };
    if (userId !== undefined) query.owner = userId;
    return this.exerciseTypeRepository.findOneBy(query);
  }

  async addOne (exerciseType: Omit<ExerciseType, 'id'>): Promise<void> {
    await this.exerciseTypeRepository.insert(exerciseType);
  }

  async deleteOne(id: number): Promise<void> {
    await this.exerciseTypeRepository.delete(id);
  }
}
