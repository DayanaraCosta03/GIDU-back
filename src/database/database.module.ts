import { Module } from '@nestjs/common';
import { AppConfigService } from 'src/config/app-config.service';

import { databaseProvider } from './database.provider';

@Module({
  providers: [databaseProvider, AppConfigService],
  exports: [databaseProvider],
})
export class DatabaseModule {}
