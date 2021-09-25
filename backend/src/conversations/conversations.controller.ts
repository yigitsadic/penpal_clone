import { Controller, Get, Param } from '@nestjs/common';

@Controller('conversations')
export class ConversationsController {
  @Get()
  listAll() {
    return [
      {
        id: '1231232',
        participant_one: '12312312',
        participant_two: 'r35353',
      },
      {
        id: '1231232',
        participant_one: '12312312',
        participant_two: 'r35353',
      },
    ];
  }

  @Get('/details/:id')
  details(@Param('id') id: string) {
    return {
      id,
      participant_one: '12312312',
      participant_two: 'r35353',
      messages: [
        {
          id: '1313213',
          senderId: '1231231',
          receiverId: '1231231',
          content: '123123',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}
