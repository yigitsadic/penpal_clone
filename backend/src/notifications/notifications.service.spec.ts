import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return notifications for given user id', () => {
    const result = service.findAllForUser('xyz');

    expect(result).toHaveLength(1);
    expect(result[0].title).toEqual('Hello World');
    expect(result[0].content).toEqual('This is content');
  });

  it('should always return true mark as read', () => {
    expect(service.markAllAsRead('123123')).toBeTruthy();
  });
});
