import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './create-message.dto';

const mockMessageRepo = {
  create: jest.fn().mockImplementation(),
  save: jest.fn().mockImplementation(),
};

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepo,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save message to repository', async () => {
    await service.create('12312', new CreateMessageDto());

    expect(mockMessageRepo.create).toHaveBeenCalled();
    expect(mockMessageRepo.save).toHaveBeenCalled();
  });
});
