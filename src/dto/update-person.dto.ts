import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  public email?: string;
}
