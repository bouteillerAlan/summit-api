import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TrainingTypeService } from './trainingType.service';
import { type TrainingType } from './trainingType.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrainingTypeDto, GetTrainingTypeDto } from './trainingType.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';

@ApiTags('trainingType')
@Controller('trainingType')
@Role(RoleEnum.administrator)
@ApiBearerAuth()
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
