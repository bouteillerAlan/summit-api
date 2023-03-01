import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingType } from './trainingType.entity';
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TrainingTypeService {
  constructor(
    @InjectRepository(TrainingType)
    private readonly trainingTypeRepository: Repository<TrainingType>
  ) {}

  async findAll(): Promise<TrainingType[]> {
    return this.trainingTypeRepository.find();
  }

  async findOne(id: number): Promise<TrainingType | null> {
    return this.trainingTypeRepository.findOneBy({ id });
  }

  async addOne(trainingType: QueryDeepPartialEntity<TrainingType>): Promise<void> {
    if (trainingType.name === undefined) throw new BadRequestException('no training type name given');
    const name: string = trainingType.name as string;
    const code = name.slice(0, 3).toUpperCase();
    await this.trainingTypeRepository.insert({ ...trainingType, code });
  }

  async deleteOne(id: number): Promise<void> {
    await this.trainingTypeRepository.delete(id);
  }
}
