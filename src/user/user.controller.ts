import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { type User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserDto } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOneUser(@Param() params: GetUserDto): Promise<User> {
    const user = await this.userService.findOne('id', params.id);
    if (user === null) throw new NotFoundException();
    return user;
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.addOne(createUserDto);
  }

  @Delete()
  async deleteUser(@Body() deleteUserDto: GetUserDto): Promise<void> {
    return this.userService.deleteOne(deleteUserDto.id);
  }
}
