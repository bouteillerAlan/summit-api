import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './health.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private readonly healthRepository: Repository<Health>
  ) {}

  async exist(whereOption: Record<string, string | number>): Promise<boolean> {
    return this.healthRepository.exist({ where: whereOption });
  }

  async findAll(userId?: number, trainingId?: number): Promise<Health[]> {
    const query: Record<string, number> = {};
    if (userId !== undefined) query.owner = userId;
    if (trainingId !== undefined) query.training = trainingId;
    return this.healthRepository.findBy(query);
  }

  async findOne(id: number, userId?: number): Promise<Health | null> {
    const query: Record<string, number> = { id };
    if (userId !== undefined) query.owner = userId;
    return this.healthRepository.findOneBy(query);
  }

  async addOne(health: Omit<Health, 'id'>): Promise<void> {
    await this.healthRepository.insert(health);
  }

  async deleteOne(id: number): Promise<void> {
    await this.healthRepository.delete(id);
  }
}
