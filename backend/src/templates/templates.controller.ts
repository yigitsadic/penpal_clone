import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateTemplateDto } from './create-template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private service: TemplatesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const { id } = req.user;

    return this.service.findAll(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request, @Body() dto: CreateTemplateDto) {
    return await this.service.create(req.user.id, dto);
  }
}
