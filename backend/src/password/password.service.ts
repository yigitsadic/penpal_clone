import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(pwd: string) {
    return await bcrypt.hash(pwd, 12);
  }

  async comparePasswords(
    given: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(given, storedPassword);
  }
}
