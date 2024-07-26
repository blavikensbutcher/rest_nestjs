import { Priority } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  text?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isCompleted?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  createdAt?: string;

  @ApiProperty({ enum: Priority })
  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase())
  priority?: Priority;
}
