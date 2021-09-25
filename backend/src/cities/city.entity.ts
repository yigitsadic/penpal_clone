import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  // I will look for geo features of Postgres.
  /*
  public longitude: number;
  public latitude: number;
   */

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
