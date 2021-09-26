import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {}

  async findAllForUser(userId: string) {
    return await this.repository.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async markAllAsRead(userId: string) {
    await this.repository.update(
      {
        userId,
        isRead: false,
      },
      { isRead: true, readAt: 'now()' },
    );
  }
}
