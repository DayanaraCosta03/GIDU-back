import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;
}
