import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { Template } from './template.entity';

import * as mocks from 'node-mocks-http';
import { CreateTemplateDto } from './create-template.dto';

const mockTemplateService = {
  findAll: jest.fn().mockImplementation(() => {
    const t1 = new Template();
    t1.id = '12312';

    return [t1];
  }),
  create: jest.fn().mockImplementation(() => {
    const t = new Template();
    t.id = 'loremipsum';

    return t;
  }),
};

describe('TemplatesController', () => {
  let controller: TemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        {
          provide: TemplatesService,
          useValue: mockTemplateService,
        },
      ],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list templates for user', () => {
    const req = mocks.createRequest();
    req.user = { id: '12312312' };

    const got = controller.findAll(req);

    expect(mockTemplateService.findAll).toHaveBeenCalledWith('12312312');
    expect(got).toHaveLength(1);
  });

  it('should handle create with valid params', async () => {
    const req = mocks.createRequest();
    req.user = { id: '12312312' };

    const dto = new CreateTemplateDto();
    dto.content = 'Hello darkness my old friend how are you today?';
    dto.languageId = '4545232131232';

    const got = await controller.create(req, dto);

    expect(mockTemplateService.create).toHaveBeenCalled();
    expect(got.id).toEqual('loremipsum');
  });
});
