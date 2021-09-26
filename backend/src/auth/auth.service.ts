import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../password/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
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

  generateToken(id: string): string {
    const payload = {
      sub: id,
    };

    return this.jwtService.sign(payload);
  }
}
