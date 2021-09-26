import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { Template } from './template.entity';

import * as mocks from 'node-mocks-http';

const mockTemplateService = {
  findAll: jest.fn().mockImplementation(() => {
    const t1 = new Template();
    t1.id = '12312';

    return [t1];
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
});
