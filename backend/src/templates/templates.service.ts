import { Injectable } from '@nestjs/common';
import { Template } from './template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './create-template.dto';

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

  async create(userId: string, dto: CreateTemplateDto) {
    const template = this.repository.create({
      ...dto,
      userId,
    });

    return await this.repository.save(template);
  }
}
