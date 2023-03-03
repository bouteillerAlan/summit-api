import { Controller, Get, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/localAuth.guard';
import { LoginDto } from './auth/login.dto';
import { AuthService } from './auth/auth.service';
import { type User } from './user/user.entity';
import { JwtAuthGuard } from './auth/jwtAuth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginId: LoginDto, @Request() req: Request & { user: User }): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
