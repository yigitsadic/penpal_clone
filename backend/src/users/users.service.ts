import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async userDetail(id: string) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async searchUser(gender: string) {
    return await this.repository.find({
      where: {
        gender,
      },
    });
  }
}
