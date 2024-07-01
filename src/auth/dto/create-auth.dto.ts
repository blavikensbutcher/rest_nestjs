import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

  @IsEmail()
  email: string;

  @MinLength(3, { message: "Password must be at least 3 character long"})
  @IsString()
  password: string;
}
