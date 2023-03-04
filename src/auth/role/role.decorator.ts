import { type CustomDecorator, SetMetadata } from '@nestjs/common';
import { type RoleEnum } from './role.enum';

// IMPORTANT :: I don't love to deal with array, but I love to use inheritance level in my role,
//              so I made the decorator with only one string parameter. E.g. below.
//              In the RoleGuard if the role 'admin' is set, only admin have the clearance
//              In the RoleGuard if the role 'user' is set, only user and admin have the clearance
//              In the RoleGuard if the role 'public' is set, the route is public
export const Role = (role: RoleEnum): CustomDecorator<string> => SetMetadata('role', role);
