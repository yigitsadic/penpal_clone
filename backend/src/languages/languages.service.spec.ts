import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesService } from './languages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Language } from './language.entity';

const mockLanguageRepository = {
  find: jest.fn().mockImplementation(() => {
    const l1 = new Language();
    l1.id = '213123';
    l1.name = 'French';
    l1.shortCode = 'FR';
    l1.localName = 'Français';

    const l2 = new Language();
    l2.id = '33535231';
    l2.name = 'English';
    l2.localName = 'English';
    l2.shortCode = 'EN';

    return [l1, l2];
  }),
};

describe('LanguagesService', () => {
  let service: LanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguagesService,
        {
          provide: getRepositoryToken(Language),
          useValue: mockLanguageRepository,
        },
      ],
    }).compile();

    service = module.get<LanguagesService>(LanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list available languages', async () => {
    const got = await service.findAll();

    expect(mockLanguageRepository.find).toHaveBeenCalled();
    expect(got).toHaveLength(2);
  });
});
