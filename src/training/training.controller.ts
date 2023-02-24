import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { TrainingService } from './training.service';
import { Training } from './training.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto, GetTrainingDto } from './training.dto';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}
  @Get()
  getTraining(): Promise<Training[]> {
    return this.trainingService.findAll();
  }
  @Get(':id')
  getOneTraining(@Param() params: GetTrainingDto): Promise<Training> {
    return this.trainingService.findOne(params.id);
  }
  @Post()
  addTraining(@Body() createTrainingDto: CreateTrainingDto): Promise<void> {
    return this.trainingService.addOne(createTrainingDto);
  }
  @Delete()
  deleteTraining(@Body() deleteTrainingDto: GetTrainingDto): Promise<void> {
    return this.trainingService.deleteOne(deleteTrainingDto.id);
  }
}
