import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async register(dto: RegistrationDto) {
    const newUser = this.repository.create(dto);
    newUser.password = await this.hashPassword(dto.password);
    return await this.repository.save(newUser);
  }

  async hashPassword(pwd: string) {
    return await bcrypt.hash(pwd, 12);
  }
}
