import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ExpedientEntity } from './expedient.entity';
import { AreaEntity } from './area.entity';

@Entity('history')
export class HistoryEntity {
  @PrimaryGeneratedColumn({ name: 'history_id' })
  id: number;

  @ManyToOne(() => ExpedientEntity, { nullable: false })
  expedient: ExpedientEntity;

  @Column()
  action: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  movement_date: Date;

  @ManyToOne(() => AreaEntity, { nullable: false })
  originArea: AreaEntity;

  @ManyToOne(() => AreaEntity, { nullable: false })
  destinationArea: AreaEntity;
}
