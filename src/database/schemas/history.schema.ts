import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ExpedientSchema } from './expedient.schema';
import { WorkAreaSchema } from './work-area.schema';

@Entity('history')
export class HistorySchema {
  @PrimaryGeneratedColumn({ name: 'history_id' })
  id: number;

  @ManyToOne(() => ExpedientSchema, { nullable: false })
  expedient: ExpedientSchema;

  @Column()
  action: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  movement_date: Date;

  @ManyToOne(() => WorkAreaSchema, { nullable: false })
  originArea: WorkAreaSchema;

  @ManyToOne(() => WorkAreaSchema, { nullable: false })
  destinationArea: WorkAreaSchema;
}
