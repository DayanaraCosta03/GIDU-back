import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DocumentTypeSchema } from './document-type.schema';
import { UserSchema } from './user.schema';
import { WorkAreaSchema } from './work-area.schema';

@Entity('expedient')
export class ExpedientSchema {
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

  @ManyToOne(() => DocumentTypeSchema, { nullable: false })
  documentType: DocumentTypeSchema;

  @ManyToOne(() => WorkAreaSchema, { nullable: false })
  originArea: WorkAreaSchema;

  @ManyToOne(() => UserSchema, { nullable: false })
  registeredBy: UserSchema;
}
