import { Injectable } from '@nestjs/common';
import Notification from './notification.model';

@Injectable()
export class NotificationsService {
  findAllForUser(userId: string): Notification[] {
    const notification = new Notification();
    notification.userId = userId;
    notification.title = 'Hello World';
    notification.content = 'This is content';
    notification.readAt = new Date().toISOString();

    return [notification];
  }
}
