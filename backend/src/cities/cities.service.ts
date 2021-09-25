import { Injectable } from '@nestjs/common';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private repository: Repository<City>,
  ) {}

  async findAll() {
    return await this.repository.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
