import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  @MinLength(30)
  @MaxLength(500)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  languageId: string;
}
