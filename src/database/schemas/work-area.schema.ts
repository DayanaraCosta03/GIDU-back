import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('area')
export class AreaEntity {
  @PrimaryGeneratedColumn({ name: 'area_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  chief_name?: string;
}
