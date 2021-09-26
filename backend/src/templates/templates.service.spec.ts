import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { CreateTemplateDto } from './create-template.dto';

const mockTemplateRepository = {
  find: jest.fn().mockImplementation(() => {
    const t1 = new Template();
    t1.id = '12312';

    return [t1];
  }),
  create: jest
    .fn()
    .mockImplementation(
      (params: { languageId: string; content: string; userId: string }) => {
        const tmp = new Template();
        tmp.content = params.content;
        tmp.userId = params.userId;
        tmp.languageId = params.languageId;

        return tmp;
      },
    ),
  save: jest.fn().mockImplementation((tmp: Template) => tmp),
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

  it('should insert record with given dto', async () => {
    const dto = new CreateTemplateDto();
    dto.languageId = '1231231';
    dto.content = 'sample';

    const userId = '131231312';

    const got = await service.create(userId, dto);

    expect(mockTemplateRepository.create).toHaveBeenCalledWith({
      languageId: dto.languageId,
      content: dto.content,
      userId,
    });
    expect(mockTemplateRepository.save).toHaveBeenCalled();

    expect(got.userId).toEqual(userId);
    expect(got.content).toEqual(dto.content);
    expect(got.languageId).toEqual(dto.languageId);
  });
});
