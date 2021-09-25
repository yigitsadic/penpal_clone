import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { Language } from './language.entity';

describe('LanguagesController', () => {
  let controller: LanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguagesController],
      providers: [
        {
          provide: LanguagesService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => {
              const l1 = new Language();
              l1.id = '13434343';
              l1.name = 'French';
              l1.localName = 'Français';
              l1.shortCode = 'FR';

              return [l1];
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<LanguagesController>(LanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with list of available languages', async () => {
    const result = await controller.findAll();

    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('French');
  });
});
