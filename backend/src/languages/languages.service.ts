import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private repository: Repository<Language>,
  ) {}

  async findAll() {
    return await this.repository.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
