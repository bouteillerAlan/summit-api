import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';
import { JwtAuthGuard } from './jwt/jwtAuth.guard';

// IMPORTANT :: in this module I have set up globally the jwt guard and the role guard
//              if you want to set up some endpoint public you need to use the custom
//              'IsPublic' decorator - same if you want to use the local strategy
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: configService.get('jwtExpires') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard }
  ],
  exports: [AuthService]
})

export class AuthModule {}
