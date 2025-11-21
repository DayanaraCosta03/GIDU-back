import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class PermissionSchema {
  @PrimaryGeneratedColumn({ name: 'permission_id' })
  id: number;

  @Column({ unique: true })
  name: string;
}
