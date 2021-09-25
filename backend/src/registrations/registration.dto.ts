import { Gender } from '../users/genders.enum';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty()
  @IsIn([Gender.male, Gender.female])
  gender: Gender;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  bio: string;

  @IsNotEmpty()
  @IsUUID()
  cityId: string;
}
