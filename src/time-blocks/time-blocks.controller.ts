import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimeBlocksService } from './time-blocks.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { TimeBlocksDto } from './dto/time-blocks.dto';
import { UpdateBlocksDto } from './dto/update-blocks-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/users/time-blocks')
@ApiBearerAuth()
@ApiTags('Time-blocks')
export class TimeBlocksController {
  constructor(private readonly timeBlockService: TimeBlocksService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.timeBlockService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  @Auth()
  async create(@Body() dto: TimeBlocksDto, @CurrentUser('id') userId: string) {
    return this.timeBlockService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-order')
  @Auth()
  async updateOrder(@Body() updateBlocksDto: UpdateBlocksDto) {
    return this.timeBlockService.updateOrder(updateBlocksDto.ids);
  }

  @Auth()
  @Patch(':id')
  async update(
    @Body() dto: TimeBlocksDto,
    @CurrentUser('id') userId: string,
    @Param('id') timeBlockId: string,
  ) {
    return this.timeBlockService.update(dto, timeBlockId, userId);
  }

  @Auth()
  @Delete(':id')
  async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.timeBlockService.delete(id);
  }
}
