import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_type')
export class DocumentTypeSchema {
  @PrimaryGeneratedColumn({ name: 'document_type_id' })
  id: number;

  @Column({ unique: true })
  name: string;
}
