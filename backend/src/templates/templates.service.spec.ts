import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Template } from './template.entity';

const mockTemplateRepository = {
  find: jest.fn().mockImplementation(() => {
    const t1 = new Template();
    t1.id = '12312';

    return [t1];
  }),
};

describe('TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: getRepositoryToken(Template),
          useValue: mockTemplateRepository,
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should list templates of given user's id", async () => {
    const got = await service.findAll('12312312');

    expect(got).toHaveLength(1);
  });
});
