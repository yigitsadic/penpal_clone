import { Controller, Get } from '@nestjs/common';
import Template from './template.model';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private service: TemplatesService) {}

  @Get()
  findAll(): Template[] {
    return this.service.findAll('13123');
  }
}
