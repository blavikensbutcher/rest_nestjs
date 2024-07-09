import { IsArray, IsString } from 'class-validator';

export class UpdateBlocksDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
