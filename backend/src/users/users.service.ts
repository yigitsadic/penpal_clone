import { Injectable } from '@nestjs/common';
import User from './user.model';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: '123123',
      firstName: 'Lorem',
      lastName: 'Ipsum',
    },
  ];

  userDetail(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
