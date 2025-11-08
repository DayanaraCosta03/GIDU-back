import path from 'path';

import { AppConfigService } from 'src/config/app-config.service';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const databaseProvider: TypeOrmModuleAsyncOptions = {
  inject: [AppConfigService],
  useFactory: (config: AppConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    ...config.DATABASE_CONFIG,
    entities: [path.join(__dirname, '/../**/*.schema.{ts,js}')],
    synchronize: !config.PRODUCTION,
  }),
};
