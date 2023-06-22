import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { TrainingService } from './training.service';
import { type Training } from './training.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto, GetTrainingByDateDto, GetTrainingByIdDto } from './training.dto';
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
    return this.trainingService.findAll(req.user.userId);
  }

  @Get(':id')
  async getOneTraining(@Param() params: GetTrainingByIdDto, @Request() req: JwtRequest): Promise<Training | null> {
    const training = await this.trainingService.findOne(params.id, req.user.userId);
    if (training === null) throw new NotFoundException();
    return training;
  }

  @Get('d/:date')
  async getAllTrainingByOneDay(@Param() params: GetTrainingByDateDto, @Request() req: JwtRequest): Promise<Training[]> {
    return await this.trainingService.findAllByDate(params.date, req.user.userId);
  }

  @Post()
  async addTraining(@Body() createTrainingDto: CreateTrainingDto, @Request() req: JwtRequest): Promise<void> {
    return this.trainingService.addOne({ ...createTrainingDto, owner: req.user.userId });
  }

  @Delete()
  async deleteTraining(@Body() deleteTrainingDto: GetTrainingByIdDto, @Request() req: JwtRequest): Promise<void> {
    const trainingExist = await this.trainingService.exist({ id: deleteTrainingDto.id, owner: req.user.userId });
    if (!trainingExist) throw new NotFoundException();
    return this.trainingService.deleteOne(deleteTrainingDto.id);
  }
}
