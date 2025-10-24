import path from 'path';
import { AppConfigService } from 'src/config/app-config.service';
import { DataSource } from 'typeorm';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
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
