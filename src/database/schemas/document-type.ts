import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_type')
export class DocumentTypeEntity {
  @PrimaryGeneratedColumn({ name: 'document_type_id' })
  id: number;

  @Column({ unique: true })
  name: string;
}
