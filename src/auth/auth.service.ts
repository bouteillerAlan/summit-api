import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { type User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async validatePassword(passwordHash: string, passwordPlainText: string): Promise<boolean> {
    return bcrypt.compare(passwordPlainText, passwordHash);
  }

  async validateUser(email: string, passwordHash: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne('email', email);
    if (user !== null) {
      const validatedUser = await this.validatePassword(user.password, passwordHash);
      if (validatedUser) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
