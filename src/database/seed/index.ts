import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { runSeed } from './initial.seed';
import { DATA_SOURCE_SYMBOL } from '../database.provider';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DATA_SOURCE_SYMBOL);

  await runSeed(dataSource);
  await app.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('Error ejecutando el seed:', err);
  process.exit(1);
});
