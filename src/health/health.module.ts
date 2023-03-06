import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Health } from './health.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Health])],
  providers: [HealthService],
  controllers: [HealthController]
})

export class HealthModule {}
