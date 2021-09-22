import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import Language from './language.model';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  findAll(): Language[] {
    return this.languagesService.findAll();
  }
}
