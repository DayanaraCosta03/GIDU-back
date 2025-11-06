import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PermissionSchema } from './permission.schema';

@Entity('role')
export class RoleSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => PermissionSchema, { cascade: true })
  @JoinTable()
  permissions: PermissionSchema[];
}
