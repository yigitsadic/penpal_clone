import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async relatedFor(userId: string) {
    return await this.repository
      .createQueryBuilder()
      .where('senderId=:userId or receiverId=:userId', { userId })
      .getMany();
  }

  async create(userId: string, dto: CreateMessageDto) {
    const message = this.repository.create({
      senderId: userId,
      ...dto,
    });

    return await this.repository.save(message);
  }
}
