import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockCityRepository = {
  find: jest.fn().mockImplementation(() => {
    const c1 = new City();
    c1.id = '123123';
    c1.name = 'Athens';
    c1.country = 'Greece';

    const c2 = new City();
    c2.id = '2323232';
    c2.name = 'Tallinn';
    c2.country = 'Estonia';

    return [c1, c2];
  }),
};

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useValue: mockCityRepository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return two cities', async () => {
    const got = await service.findAll();

    expect(mockCityRepository.find).toHaveBeenCalled();
    expect(got).toHaveLength(2);
    expect(got[0].name).toEqual('Athens');
    expect(got[1].name).toEqual('Tallinn');
  });
});
