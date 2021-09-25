import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Gender } from './genders.enum';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/:id')
  details(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.userDetail(id);
  }

  @Get()
  search(@Query('gender', new ParseEnumPipe(Gender)) gender: Gender) {
    return this.service.searchUser(gender);
  }
}
