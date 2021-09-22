import { Injectable } from '@nestjs/common';
import Language from './language.model';

@Injectable()
export class LanguagesService {
  findAll(): Language[] {
    const l1 = new Language();
    l1.name = 'Turkish';
    l1.localName = 'Türkçe';
    l1.shortCode = 'TR';

    const l2 = new Language();
    l2.name = 'French';
    l2.localName = 'Français';
    l2.shortCode = 'FR';

    return [l1, l2];
  }
}
