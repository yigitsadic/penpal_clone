import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';
import * as mocks from 'node-mocks-http';

const mockMessagesService = {
  create: jest.fn().mockImplementation(),
};

describe('MessagesController', () => {
  const req = mocks.createRequest();
  req.user = { id: '12312312' };

  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should insert given message', async () => {
    const dto = new CreateMessageDto();
    dto.content = 'Lorem';
    dto.receiverId = '12312321';

    await controller.create(dto, req);

    expect(mockMessagesService.create).toHaveBeenCalledWith('12312312', dto);
  });
});
