import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  languageId: string;

  @Column()
  userId: string;

  @Column()
  createdAt: string;
}
