import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import City from './city.model';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  findAll(): City[] {
    return this.citiesService.findAll();
  }
}
