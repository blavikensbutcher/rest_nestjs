import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalCount?: number;
}

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @ApiProperty()
  email?: string;

  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'Password must be longer than 3 symbols' })
  @IsOptional()
  password?: string;
}
