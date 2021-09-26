import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(30)
  @MaxLength(500)
  content: string;

  @IsUUID()
  receiverId: string;
}
