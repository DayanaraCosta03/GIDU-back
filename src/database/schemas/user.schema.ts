import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleSchema } from './role.schema';

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8, unique: true })
  dni: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean' })
  isSuperAdmin: boolean;

  @ManyToOne(() => RoleSchema, { nullable: false })
  role: RoleSchema;
}
