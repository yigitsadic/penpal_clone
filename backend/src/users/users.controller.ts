import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './user.model';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/:id')
  details(@Param('id') id: string): User {
    return this.service.userDetail(id);
  }
}
