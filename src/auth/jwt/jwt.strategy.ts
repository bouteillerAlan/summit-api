import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { type UserPayload } from './userPayload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret')
    });
  }

  // Reminder :: The validate() function is called after the Passport has verified and found that a token
  //             is valid (valid signature, not expired, etc.). If the token is valid, then it decodes and extracts
  //             the payload as a JSON object and makes it available, so we can use it in the validate() function.
  async validate(payload: Record<string, string>): Promise<UserPayload> {
    // I'm not sure that I actually need this but just in case I check if the user exist
    const validatedUser = await this.authService.validateUserExistence(payload.email);
    if (validatedUser === null) throw new UnauthorizedException();
    // return the following json into request['user']
    return { userId: validatedUser.id, email: validatedUser.email, role: validatedUser.role, payload };
  }
}
