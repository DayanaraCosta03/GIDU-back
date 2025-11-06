import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work_area')
export class WorkAreaSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
