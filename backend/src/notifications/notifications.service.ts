import { Injectable } from '@nestjs/common';
import Notification from './notification.model';

@Injectable()
export class NotificationsService {
  notifications: Notification[] = [
    {
      title: 'Hello World',
      content: 'This is content',
      readAt: undefined,
      userId: '131231',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAllForUser(_userId: string): Notification[] {
    return this.notifications;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markAllAsRead(_userId: string): boolean {
    return true;
  }
}
