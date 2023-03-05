import { type Request } from '@nestjs/common';
import { type UserPayload } from './userPayload.type';

export interface JwtRequest extends Request {
  user: UserPayload
}
