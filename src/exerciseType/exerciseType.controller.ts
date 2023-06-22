import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { ExerciseTypeService } from './exerciseType.service';
import { type ExerciseType } from './exerciseType.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExerciseTypeDto, GetExerciseTypeDto } from './exerciseType.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@ApiTags('exerciseType')
@Controller('exerciseType')
@Role(RoleEnum.user)
@ApiBearerAuth()
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @Get()
  async getExerciseType(@Request() req: JwtRequest): Promise<ExerciseType[]> {
    return this.exerciseTypeService.findAll();
  }

  @Get(':id')
  async getOneExerciseType(@Param() params: GetExerciseTypeDto, @Request() req: JwtRequest): Promise<ExerciseType> {
    const exerciseType = await this.exerciseTypeService.findOne(params.id, req.user.userId);
    if (exerciseType === null) throw new NotFoundException();
    return exerciseType;
  }

  @Post()
  async addExerciseType(@Body() createExerciseTypeDto: CreateExerciseTypeDto, @Request() req: JwtRequest): Promise<void> {
    return this.exerciseTypeService.addOne({ ...createExerciseTypeDto, owner: req.user.userId });
  }

  @Delete()
  async deleteExerciseType(@Body() deleteExerciseTypeDto: GetExerciseTypeDto, @Request() req: JwtRequest): Promise<void> {
    const exerciseTypeExist = await this.exerciseTypeService.exist({ id: deleteExerciseTypeDto.id, owner: req.user.userId });
    if (!exerciseTypeExist) throw new NotFoundException();
    return this.exerciseTypeService.deleteOne(deleteExerciseTypeDto.id);
  }
}
