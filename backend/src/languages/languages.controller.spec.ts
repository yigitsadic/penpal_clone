import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

describe('LanguagesController', () => {
  let controller: LanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguagesController],
      providers: [LanguagesService],
    }).compile();

    controller = module.get<LanguagesController>(LanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with list of available languages', () => {
    // TODO: It should replaced with real tests.
    expect(controller.findAll()).toHaveLength(2);
  });
});
