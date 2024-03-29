import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { type Exercise } from './exercise.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExerciseDto, GetExerciseDto } from './exercise.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@ApiTags('exercise')
@Controller('exercise')
@Role(RoleEnum.user)
@ApiBearerAuth()
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async getExercise(@Request() req: JwtRequest): Promise<Exercise[]> {
    return this.exerciseService.findAll(req.user.userId);
  }

  @Get(':id')
  async getOneExercise(@Param() params: GetExerciseDto, @Request() req: JwtRequest): Promise<Exercise | null> {
    const exercise = await this.exerciseService.findOne(params.id, req.user.userId);
    if (exercise === null) throw new NotFoundException();
    return exercise;
  }

  @Post()
  async addExercise(@Body() createExerciseDto: CreateExerciseDto, @Request() req: JwtRequest): Promise<void> {
    return this.exerciseService.addOne({ ...createExerciseDto, owner: req.user.userId });
  }

  @Delete()
  async deleteExercise(@Body() deleteExerciseDto: GetExerciseDto, @Request() req: JwtRequest): Promise<void> {
    const exerciseExist = await this.exerciseService.exist({ id: deleteExerciseDto.id, owner: req.user.userId });
    if (!exerciseExist) throw new NotFoundException();
    return this.exerciseService.deleteOne(deleteExerciseDto.id);
  }
}
