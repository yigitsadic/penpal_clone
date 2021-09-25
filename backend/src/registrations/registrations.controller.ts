import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private service: RegistrationsService) {}

  @Post()
  async register(@Body() registerDto: RegistrationDto) {
    await this.service.register(registerDto);

    return { message: 'successful' };
  }
}
