import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './training.entity';
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>
  ) {}
  findAll(): Promise<Training[]> {
    return this.trainingRepository.find();
  }
  findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOneBy({ id });
  }
  async addOne(training: QueryDeepPartialEntity<Training>): Promise<void> {
    await this.trainingRepository.insert(training);
  }
  async deleteOne(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }
}
