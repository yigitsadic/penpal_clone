import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { RegistrationsService } from './registrations.service';
import { AuthService } from '../auth/auth.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(
    private service: RegistrationsService,
    private authService: AuthService,
  ) {}

  @Post()
  async register(@Body() registerDto: RegistrationDto) {
    try {
      const user = await this.service.register(registerDto);
      const token = this.authService.generateToken(user.id);
      return { access_token: token };
    } catch (error) {
      throw new UnprocessableEntityException(error, 'unable to continue');
    }
  }
}
