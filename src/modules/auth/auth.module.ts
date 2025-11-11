import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import {
  PermissionSchema,
  RoleSchema,
  UserSchema,
  WorkAreaSchema,
} from 'src/database/schemas';

import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { AuthGuard } from './guard/auth.guard';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([
      PermissionSchema,
      RoleSchema,
      UserSchema,
      WorkAreaSchema,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, LoginService, ProfileService, RegisterService],
  exports: [AuthGuard],
})
export class AuthModule {}
