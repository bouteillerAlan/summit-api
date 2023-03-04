import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from './role.enum';
import { type UserPayload } from '../jwt/userPayload.type';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private getUserInRequest(context: ExecutionContext): UserPayload {
    const request = context.switchToHttp().getRequest();
    if (request === undefined || request.user === undefined) throw new UnauthorizedException();
    return request.user;
  }

  canActivate(context: ExecutionContext): boolean {
    // if the endpoint is public, let it pass
    // this code allow the use of the @IsPublic decorator and the setup of the role guard globally
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    // get the role from the decorator
    const answeredRole: number = this.reflector.get<number>('role', context.getHandler());
    if (answeredRole === undefined) return false; // if no role defined throw unauthorized

    // here the jwt is already validated via the jwt strategy,
    // so we pick the user via the request data and
    // the jwt strategy have added to request.user the 'payload' index
    // if this index is not present this mean that the role guard
    // is called before the jwt guard, or not called, and this is not good
    const userData = this.getUserInRequest(context);
    if (userData.payload === undefined) return false;

    if (userData.role === RoleEnum.administrator) return true; // if the user is an admin, let it pass
    return userData.role === answeredRole; // if not check the role access
  }
}
