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

  // todo - check why the handler doesn't have the data form the class when we check the role
  canActivate(context: ExecutionContext): boolean {
    // if the endpoint is public, let it pass
    // this code allow the use of the @IsPublic decorator and the setup of the role guard globally
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    // let's check the role from the decorator
    let answeredRole;
    // first from the function in the class
    const answeredRoleHandler: number = this.reflector.get<number>('role', context.getHandler());

    if (answeredRoleHandler === undefined) { // if the function in the class return nothing we check the class itself
      const answeredRoleClass: number = this.reflector.get<number>('role', context.getClass());
      // finally if both the handler and the class doesn't have a role defined we throw unauthorized
      if (answeredRoleClass === undefined) {
        return false;
      } else {
        answeredRole = answeredRoleClass;
      }
    } else {
      answeredRole = answeredRoleHandler;
    }

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
