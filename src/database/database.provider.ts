import { Provider } from '@nestjs/common';
import path from 'path';

import { AppConfigService } from 'src/config/app-config.service';
import { DataSource } from 'typeorm';

export const DATA_SOURCE_SYMBOL = Symbol('DATA_SOURCE');

export const databaseProvider: Provider = {
  provide: DATA_SOURCE_SYMBOL,
  useFactory: async (config: AppConfigService) => {
    const dataSource = new DataSource({
      type: 'mysql',
      ...config.DATABASE_CONFIG,
      entities: [path.join(__dirname, '/../**/*.schema.ts')],
      synchronize: !config.PRODUCTION, // true in development mode
    });

    return dataSource.initialize();
  },
  inject: [AppConfigService],
};
