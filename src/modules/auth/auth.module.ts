import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';

import { AuthController } from './auth.controller';
import { RegisterService } from './services/register.service';

@Module({
  imports: [AppConfigModule],
  controllers: [AuthController],
  providers: [RegisterService],
})
export class AuthModule {}
