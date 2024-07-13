import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PomodoroSessionDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isCompleted: boolean;
}

export class PomodoroRoundDto {
  @IsNumber()
  @ApiProperty()
  totalSeconds: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isCompleted: boolean;
}
