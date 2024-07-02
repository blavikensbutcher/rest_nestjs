import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class PomodoroSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalCount?: number;
}

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(3, { message: 'Password must be longer than 3 symbols' })
  name?: string;

  @IsString()
  password?: string;
}
