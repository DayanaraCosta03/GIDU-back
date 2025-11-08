import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';

import { databaseProvider } from './database.provider';

@Global()
@Module({
  imports: [AppConfigModule, TypeOrmModule.forRootAsync(databaseProvider)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
