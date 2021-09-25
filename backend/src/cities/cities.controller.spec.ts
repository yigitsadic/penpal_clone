import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './city.entity';

const mockCityService = {
  findAll: jest.fn().mockImplementation(() => {
    const city = new City();
    city.name = 'Ankara';
    city.id = '12312';
    city.country = 'Turkey';

    return [city];
  }),
};

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list cities', async () => {
    const got = await controller.findAll();

    expect(got[0].name).toBe('Ankara');
    expect(mockCityService.findAll).toHaveBeenCalled();
  });
});
