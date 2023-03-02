import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingType } from './trainingType.entity';
import { type CreateTrainingTypeDto } from './trainingType.dto';

@Injectable()
export class TrainingTypeService {
  constructor(
    @InjectRepository(TrainingType)
    private readonly trainingTypeRepository: Repository<TrainingType>
  ) {}

  private generateCode (name: string): string {
    return name.slice(0, 3).toUpperCase();
  }

  async findAll(): Promise<TrainingType[]> {
    return this.trainingTypeRepository.find();
  }

  async findOne(id: number): Promise<TrainingType | null> {
    return this.trainingTypeRepository.findOneBy({ id });
  }

  async addOne (trainingType: CreateTrainingTypeDto): Promise<void> {
    await this.trainingTypeRepository.insert({ ...trainingType, code: this.generateCode(trainingType.name) });
  }

  async deleteOne(id: number): Promise<void> {
    await this.trainingTypeRepository.delete(id);
  }
}
