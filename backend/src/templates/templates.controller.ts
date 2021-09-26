import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('templates')
export class TemplatesController {
  constructor(private service: TemplatesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const { id } = req.user;

    return this.service.findAll(id);
  }
}
