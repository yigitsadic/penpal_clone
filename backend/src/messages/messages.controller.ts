import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const { id } = req.user;

    return this.service.create(id, dto);
  }
}
