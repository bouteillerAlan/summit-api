import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { type CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(field: string, value: string | number): Promise<User | null> {
    const query: Record<string, string | number> = {};
    query[field] = value;
    return this.userRepository.findOneBy(query);
  }

  async addOne (user: CreateUserDto): Promise<void> {
    bcrypt.hash(user.password, 14)
      .then(async (bcryptPass: string) => {
        user.password = bcryptPass;
        await this.userRepository.insert(user);
      })
      .catch(() => {
        throw new InternalServerErrorException('bcrypt error');
      });
  }

  async deleteOne(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
