import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { TrainingService } from './training.service';
import { type Training } from './training.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto, GetTrainingDto } from './training.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@ApiTags('training')
@Controller('training')
@Role(RoleEnum.user)
@ApiBearerAuth()
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  async getTraining(@Request() req: JwtRequest): Promise<Training[]> {
    return this.trainingService.findAll();
  }

  @Get(':id')
  async getOneTraining(@Param() params: GetTrainingDto, @Request() req: JwtRequest): Promise<Training | null> {
    const training = await this.trainingService.findOne(params.id);
    if (training === null) throw new NotFoundException();
    return training;
  }

  @Post()
  async addTraining(@Body() createTrainingDto: CreateTrainingDto, @Request() req: JwtRequest): Promise<void> {
    return this.trainingService.addOne({ ...createTrainingDto, owner: parseInt(req.user.userId) });
  }

  @Delete()
  async deleteTraining(@Body() deleteTrainingDto: GetTrainingDto, @Request() req: JwtRequest): Promise<void> {
    const trainingExist = await this.trainingService.exist({ id: deleteTrainingDto.id, owner: parseInt(req.user.userId) });
    if (!trainingExist) throw new NotFoundException();
    return this.trainingService.deleteOne(deleteTrainingDto.id);
  }
}
