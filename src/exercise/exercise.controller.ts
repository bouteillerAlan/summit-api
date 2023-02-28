import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { type Exercise } from './exercise.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateExerciseDto, GetExerciseDto } from './exercise.dto';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async getExercise(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async getOneExercise(@Param() params: GetExerciseDto): Promise<Exercise | null> {
    return this.exerciseService.findOne(params.id);
  }

  @Post()
  async addExercise(@Body() createExerciseDto: CreateExerciseDto): Promise<void> {
    return this.exerciseService.addOne(createExerciseDto);
  }

  @Delete()
  async deleteExercise(@Body() deleteExerciseDto: GetExerciseDto): Promise<void> {
    return this.exerciseService.deleteOne(deleteExerciseDto.id);
  }
}
