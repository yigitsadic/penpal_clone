import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class PasswordService {
  async hashPassword(pwd: string) {
    return await bcrypt.hash(pwd, 12);
  }
}
