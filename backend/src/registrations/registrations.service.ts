import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../password/password.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async register(dto: RegistrationDto) {
    const newUser = this.repository.create(dto);
    newUser.password = await this.passwordService.hashPassword(dto.password);
    return await this.repository.save(newUser);
  }
}
