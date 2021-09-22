import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import City from './city.model';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list cities', () => {
    const city = new City();
    city.name = 'Ankara';

    const result = [city];

    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(controller.findAll()).toBe(result);
  });
});
