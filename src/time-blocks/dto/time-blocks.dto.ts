import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TimeBlocksDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  order: number;
}
