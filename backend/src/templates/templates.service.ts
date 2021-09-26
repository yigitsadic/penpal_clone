import { Injectable } from '@nestjs/common';
import { Template } from './template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private repository: Repository<Template>,
  ) {}

  async findAll(userId: string) {
    return await this.repository.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
