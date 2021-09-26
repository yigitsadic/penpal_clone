import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from './notification.entity';

const mockNotificationRepo = {
  find: jest.fn().mockImplementation(() => {
    return [new Notification()];
  }),
  update: jest.fn(),
};

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockNotificationRepo,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return notifications for given user id', async () => {
    const got = await service.findAllForUser('12323');

    expect(mockNotificationRepo.find).toHaveBeenCalled();
    expect(got).toHaveLength(1);
  });

  it('should always return true mark as read', async () => {
    await service.markAllAsRead('12321');

    expect(mockNotificationRepo.update).toHaveBeenCalled();
  });
});
