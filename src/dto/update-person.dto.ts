import { IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  public email?: string;
}
