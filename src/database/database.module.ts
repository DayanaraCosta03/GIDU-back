import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { AppConfigService } from 'src/config/app-config.service';

@Module({
  providers: [databaseProvider, AppConfigService],
  exports: [databaseProvider],
})
export class DatabaseModule {}
