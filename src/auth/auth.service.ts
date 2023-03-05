import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { type User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { type UserPayload } from './jwt/userPayload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async validatePasswordHash(passwordHash: string, passwordPlainText: string): Promise<boolean> {
    return bcrypt.compare(passwordPlainText, passwordHash);
  }

  async validateUserExistence(email: string): Promise<User | null> {
    return this.userService.findOne('email', email);
  }

  async validateUser(email: string, passwordHash: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.validateUserExistence(email);
    if (user !== null) {
      const validatedUser = await this.validatePasswordHash(user.password, passwordHash);
      if (validatedUser) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserPayload): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
