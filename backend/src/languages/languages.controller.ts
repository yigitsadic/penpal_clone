import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }
}
