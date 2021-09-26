import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private service: RegistrationsService) {}

  @Post()
  async register(@Body() registerDto: RegistrationDto) {
    try {
      await this.service.register(registerDto);

      return { status: 'success' };
    } catch (error) {
      throw new UnprocessableEntityException(error, 'unable to continue');
    }
  }
}
