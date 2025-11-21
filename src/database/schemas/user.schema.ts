import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleSchema } from './role.schema';
import { WorkAreaSchema } from './work-area.schema';

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 8, unique: true })
  dni: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => RoleSchema, { nullable: false })
  role: RoleSchema;

  @ManyToOne(() => WorkAreaSchema, { nullable: true })
  workArea?: WorkAreaSchema;
}
