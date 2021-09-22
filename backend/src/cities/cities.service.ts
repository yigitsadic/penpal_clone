import { Injectable } from '@nestjs/common';
import City from './city.model';

@Injectable()
export class CitiesService {
  findAll(): City[] {
    const city1 = new City();
    const city2 = new City();

    city1.name = 'Ankara';
    city2.name = 'İstanbul';

    return [city1, city2];
  }
}
