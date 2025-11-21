import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
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

  @ManyToOne(() => RoleEntity, { nullable: false })
  role: RoleEntity;
}
