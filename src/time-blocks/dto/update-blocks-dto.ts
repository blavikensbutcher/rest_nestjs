import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlocksDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  ids: string[];
}
