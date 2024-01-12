import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  public email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public givenName?: string;
}
