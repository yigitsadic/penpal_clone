import { Controller, Get, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import Notification from './notification.model';

@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @Get()
  findAll(): Notification[] {
    // TODO: Should parse token from header in the future.
    return this.service.findAllForUser('example');
  }

  @Put('/read_all')
  readAll() {
    const status = this.service.markAllAsRead('example');

    return {
      status,
    };
  }
}
