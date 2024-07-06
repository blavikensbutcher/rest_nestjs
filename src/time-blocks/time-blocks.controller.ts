import { Controller } from '@nestjs/common';
import { TimeBlocksService } from './time-blocks.service';

@Controller('time-blocks')
export class TimeBlocksController {
  constructor(private readonly timeBlockService: TimeBlocksService) {}
}
