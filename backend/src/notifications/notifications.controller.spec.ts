import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import * as mocks from 'node-mocks-http';

const mockNotificationService = {
  findAllForUser: jest.fn().mockImplementation(() => {
    return [new Notification()];
  }),
  markAllAsRead: jest.fn(),
};

describe('NotificationsController', () => {
  const req = mocks.createRequest();
  req.user = { id: '12312312' };

  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('lists notifications for user', async () => {
    const got = await controller.findAll(req);

    expect(mockNotificationService.findAllForUser).toHaveBeenCalled();
    expect(got).toHaveLength(1);
  });

  it('marks all notifications as read', () => {
    controller.readAll(req);

    expect(mockNotificationService.markAllAsRead).toHaveBeenCalled();
  });
});
