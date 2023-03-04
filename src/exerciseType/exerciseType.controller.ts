import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ExerciseTypeService } from './exerciseType.service';
import { type ExerciseType } from './exerciseType.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateExerciseTypeDto, GetExerciseTypeDto } from './exerciseType.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';

@ApiTags('exerciseType')
@Controller('exerciseType')
@Role(RoleEnum.user)
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @Get()
  async getExerciseType(): Promise<ExerciseType[]> {
    return this.exerciseTypeService.findAll();
  }

  @Get(':id')
  async getOneExerciseType(@Param() params: GetExerciseTypeDto): Promise<ExerciseType> {
    const exerciseType = await this.exerciseTypeService.findOne(params.id);
    if (exerciseType === null) throw new NotFoundException();
    return exerciseType;
  }

  @Post()
  async addExerciseType(@Body() createExerciseTypeDto: CreateExerciseTypeDto): Promise<void> {
    return this.exerciseTypeService.addOne(createExerciseTypeDto);
  }

  @Delete()
  async deleteExerciseType(@Body() deleteExerciseTypeDto: GetExerciseTypeDto): Promise<void> {
    return this.exerciseTypeService.deleteOne(deleteExerciseTypeDto.id);
  }
}
