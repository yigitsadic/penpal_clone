import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { getManager, Repository } from 'typeorm';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async relatedFor(userId: string) {
    const entityManager = getManager();
    return await entityManager.query(
      `
    select
users.id,
users."firstName",
users."lastName"
from users
where users.id in (
select distinct messages."senderId" from messages
where messages."receiverId" = $1
union all
select distinct messages."receiverId" from messages
where messages."senderId" = $1
)`,
      [userId],
    );
  }

  async conversationDetail(participant1: string, participant2: string) {
    return await this.repository
      .createQueryBuilder()
      .where(
        '("senderId" = :participant1 and "receiverId" = :participant2) or ("senderId" = :participant2 and "receiverId" = :participant1)',
        {
          participant1,
          participant2,
        },
      )
      .orderBy('"createdAt"', 'DESC')
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
