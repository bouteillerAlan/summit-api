import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TrainingTypeService } from './trainingType.service';
import { type TrainingType } from './trainingType.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrainingTypeDto, GetTrainingTypeDto } from './trainingType.dto';

@ApiTags('trainingType')
@Controller('trainingType')
export class TrainingTypeController {
  constructor(private readonly trainingTypeService: TrainingTypeService) {}

  @Get()
  async getTrainingType(): Promise<TrainingType[]> {
    return this.trainingTypeService.findAll();
  }

  @Get(':id')
  async getOneTrainingType(@Param() params: GetTrainingTypeDto): Promise<TrainingType> {
    const trainingType = await this.trainingTypeService.findOne(params.id);
    if (trainingType === null) throw new NotFoundException();
    return trainingType;
  }

  @Post()
  async addTrainingType(@Body() createTrainingTypeDto: CreateTrainingTypeDto): Promise<void> {
    return this.trainingTypeService.addOne(createTrainingTypeDto);
  }

  @Delete()
  async deleteTrainingType(@Body() deleteTrainingTypeDto: GetTrainingTypeDto): Promise<void> {
    return this.trainingTypeService.deleteOne(deleteTrainingTypeDto.id);
  }
}
