import path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppConfigService } from 'src/config/app-config.service';
import { DataSource } from 'typeorm';

import { runSeed } from './initial.seed';
import { DatabaseModule } from '../database.module';

const databaseProvider = {
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
};

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseModule);
  const config = app.get(AppConfigService);

  const dataSource = await databaseProvider.useFactory(config);

  await runSeed(dataSource);
  await app.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('Error ejecutando el seed:', err);
  process.exit(1);
});
