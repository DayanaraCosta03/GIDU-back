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
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => PermissionSchema, { cascade: true })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionSchema[];
}
