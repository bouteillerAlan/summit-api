import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/local/localAuth.guard';
import { LoginDto } from '../auth/login.dto';
import { AuthService } from '../auth/auth.service';
import { IsPublic } from '../auth/public/isPublic.decorator';
import { JwtRequest } from '../auth/jwt/jwtRequest.type';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @IsPublic()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @IsPublic()
  @Post('auth/login')
  async login(@Body() loginId: LoginDto, @Request() req: JwtRequest): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
