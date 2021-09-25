import { Injectable } from '@nestjs/common';
import Template from './template.model';

@Injectable()
export class TemplatesService {
  findAll(userId: string): Template[] {
    const tm = new Template();
    tm.title = 'Example';
    tm.content = 'Random content';

    return [tm];
  }
}
