import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TimeBlocksDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  color?: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  order: number;
}
