import { Body, Controller, Delete, Get, NotFoundException, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { type User } from './user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserDto } from './user.dto';
import { Role } from '../auth/role/role.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { IsPublic } from '../auth/public/isPublic.decorator';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@ApiTags('user')
@Controller('user')
@Role(RoleEnum.administrator)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('me')
  @Role(RoleEnum.user)
  async getOneUser(@Request() req: JwtRequest): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne('id', req.user.userId);
    if (user === null) throw new NotFoundException();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Post()
  @IsPublic()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.addOne(createUserDto);
  }

  @Delete()
  async deleteUser(@Body() deleteUserDto: GetUserDto): Promise<void> {
    return this.userService.deleteOne(deleteUserDto.id);
  }
}
