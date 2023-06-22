import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOperator, Like, Repository } from 'typeorm';
import { Training } from './training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>
  ) {}

  async exist(whereOption: Record<string, string | number>): Promise<boolean> {
    return this.trainingRepository.exist({ where: whereOption });
  }

  async findAll(userId?: number): Promise<Training[]> {
    const query: Record<string, number> = {};
    if (userId !== undefined) query.owner = userId;
    return this.trainingRepository.findBy(query);
  }

  async findOne(id: number, userId?: number): Promise<Training | null> {
    const query: Record<string, number> = { id };
    if (userId !== undefined) query.owner = userId;
    return this.trainingRepository.findOneBy(query);
  }

  async findAllByDate(date: string, userId?: number, precise: boolean = false): Promise<Training[]> {
    const query: Record<string, string | number | FindOperator<string>> = {};
    if (userId !== undefined) query.owner = userId;

    if (precise) { // if we want precise date just do the request
      query.date = date;
      return this.trainingRepository.findBy(query);
    }

    // in other case we want a like for the date
    query.date = Like(date.slice(0, 10) + '%');
    return this.trainingRepository.find({ where: query });
  }

  async addOne(training: Omit<Training, 'id'>): Promise<void> {
    await this.trainingRepository.insert(training);
  }

  async deleteOne(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }
}
