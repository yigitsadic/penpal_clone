import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../cities/city.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  bio: string;

  @Column({ select: false })
  password: string;

  // TODO: It's not working. Find a way to fix it!
  @ManyToOne(() => City, (city) => city.users, {})
  city: City;

  @Column()
  cityId: string;
}
