import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { HealthService } from './health.service';
import { type Health } from './health.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateHealthDto, GetHealthDto } from './health.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@ApiTags('health')
@Controller('health')
@Role(RoleEnum.user)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getHealth(@Request() req: JwtRequest): Promise<Health[]> {
    return this.healthService.findAll(req.user.userId);
  }

  @Get(':id')
  async getOneHealth(@Param() params: GetHealthDto, @Request() req: JwtRequest): Promise<Health | null> {
    const health = await this.healthService.findOne(params.id, req.user.userId);
    if (health === null) throw new NotFoundException();
    return health;
  }

  @Post()
  async addHealth(@Body() createHealthDto: CreateHealthDto, @Request() req: JwtRequest): Promise<void> {
    return this.healthService.addOne({ ...createHealthDto, owner: req.user.userId });
  }

  @Delete()
  async deleteHealth(@Body() deleteHealthDto: GetHealthDto, @Request() req: JwtRequest): Promise<void> {
    const healthExist = await this.healthService.exist({ id: deleteHealthDto.id, owner: req.user.userId });
    if (!healthExist) throw new NotFoundException();
    return this.healthService.deleteOne(deleteHealthDto.id);
  }
}
