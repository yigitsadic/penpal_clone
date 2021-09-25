import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import Template from './template.model';
import { TemplatesService } from './templates.service';

describe('TemplatesController', () => {
  let controller: TemplatesController;
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [TemplatesService],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return mock list of templates', () => {
    const tmp = new Template();
    tmp.title = 'Example';
    tmp.content = 'Content';

    const result = [tmp];

    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    const got = controller.findAll();

    expect(got).toBe(result);
    expect(got[0].title).toEqual(tmp.title);
    expect(got[0].content).toEqual(tmp.content);
  });
});
