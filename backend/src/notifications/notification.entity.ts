import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  content: string;

  // RFC3339
  @Column()
  readAt?: string;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: string;
}
