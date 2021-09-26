import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../cities/city.entity';
import { Exclude } from 'class-transformer';

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

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => City, (city) => city.users, {})
  city: City;

  @Column()
  cityId: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
