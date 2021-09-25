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

  findAllForUser(userId: string): Notification[] {
    return this.notifications;
  }

  markAllAsRead(userId: string): boolean {
    return true;
  }
}
