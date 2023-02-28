import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExerciseTypeService } from './exerciseType.service';
import { type ExerciseType } from './exerciseType.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateExerciseTypeDto, GetExerciseTypeDto } from './exerciseType.dto';

@ApiTags('ExerciseType')
@Controller('ExerciseType')
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @Get()
  async getExerciseType(): Promise<ExerciseType[]> {
    return this.exerciseTypeService.findAll();
  }

  @Get(':id')
  async getOneExerciseType(@Param() params: GetExerciseTypeDto): Promise<ExerciseType | null> {
    return this.exerciseTypeService.findOne(params.id);
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
