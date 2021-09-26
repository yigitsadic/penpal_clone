import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  conversations(@Req() req: Request) {
    return this.service.relatedFor(req.user.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  conversationDetail(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request,
  ) {
    return this.service.conversationDetail(id, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const { id } = req.user;

    return this.service.create(id, dto);
  }
}
