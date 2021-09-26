import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ id: string }> | null {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) return null;

      const hashedPassword = user.password;
      const matched = await this.passwordService.comparePasswords(
        password,
        hashedPassword,
      );

      if (matched) {
        return {
          id: user.id,
        };
      }
    } finally {
    }

    return null;
  }
}
