import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    return this.service.findAllForUser(req.user.id);
  }

  @Put('/read_all')
  @UseGuards(JwtAuthGuard)
  async readAll(@Req() req: Request) {
    await this.service.markAllAsRead(req.user.id);

    return {
      status: 'ok',
    };
  }
}
