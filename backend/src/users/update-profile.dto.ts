import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  bio: string;

  @IsNotEmpty()
  @IsUUID()
  cityId: string;
}
