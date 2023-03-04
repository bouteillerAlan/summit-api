import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TrainingService } from './training.service';
import { type Training } from './training.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto, GetTrainingDto } from './training.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';

@ApiTags('training')
@Controller('training')
@Role(RoleEnum.user)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  async getTraining(): Promise<Training[]> {
    return this.trainingService.findAll();
  }

  @Get(':id')
  async getOneTraining(@Param() params: GetTrainingDto): Promise<Training | null> {
    return this.trainingService.findOne(params.id);
  }

  @Post()
  async addTraining(@Body() createTrainingDto: CreateTrainingDto): Promise<void> {
    return this.trainingService.addOne(createTrainingDto);
  }

  @Delete()
  async deleteTraining(@Body() deleteTrainingDto: GetTrainingDto): Promise<void> {
    return this.trainingService.deleteOne(deleteTrainingDto.id);
  }
}
