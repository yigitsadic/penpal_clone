import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { PasswordModule } from '../password/password.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule, AuthModule],
  providers: [RegistrationsService],
  controllers: [RegistrationsController],
})
export class RegistrationsModule {}
