import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passwordHash: string): Promise<Omit<User, 'password'> | null> {
    const validatedUser = await this.authService.validateUser(email, passwordHash);
    if (validatedUser === null) throw new UnauthorizedException();
    return validatedUser;
  }
}
