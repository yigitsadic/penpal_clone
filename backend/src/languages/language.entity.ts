import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'languages' })
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  localName: string;

  @Column()
  shortCode: string;
}
