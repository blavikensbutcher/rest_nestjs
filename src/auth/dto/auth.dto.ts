import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(3, { message: 'Password must be more than 3 symbols' })
  @IsString()
  password: string;
}
