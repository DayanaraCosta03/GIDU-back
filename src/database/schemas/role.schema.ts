import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PermissionEntity } from './permission.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => PermissionEntity, { cascade: true })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];
}
