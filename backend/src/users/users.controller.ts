import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Gender } from './genders.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  profile(@Req() req: Request) {
    return this.service.userDetail(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  update(@Req() req: Request, @Body() dto: UpdateProfileDto) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  details(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.userDetail(id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  search(@Query('gender', new ParseEnumPipe(Gender)) gender: Gender) {
    return this.service.searchUser(gender);
  }
}
