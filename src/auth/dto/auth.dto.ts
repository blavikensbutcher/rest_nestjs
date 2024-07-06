import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @MinLength(3, { message: 'Password must be more than 3 symbols' })
  @IsString()
  password: string;
}
