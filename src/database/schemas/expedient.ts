import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DocumentTypeEntity } from './document-type.entity';
import { AreaEntity } from './area.entity';
import { UserEntity } from './user.entity';

@Entity('expedient')
export class ExpedientEntity {
  @PrimaryGeneratedColumn({ name: 'expedient_id' })
  id: number;

  @Column({ unique: true })
  number: string;

  @Column()
  sender: string;

  @Column()
  subject: string;

  @Column()
  pages: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => DocumentTypeEntity, { nullable: false })
  documentType: DocumentTypeEntity;

  @ManyToOne(() => AreaEntity, { nullable: false })
  originArea: AreaEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  registeredBy: UserEntity;
}
