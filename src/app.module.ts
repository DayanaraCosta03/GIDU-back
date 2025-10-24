import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AppConfigModule, AuthModule, DatabaseModule],
})
export class AppModule {}
