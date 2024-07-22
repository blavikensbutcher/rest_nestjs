import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TimeBlocksDto } from './dto/time-blocks.dto';

@Injectable()
export class TimeBlocksService {
  constructor(private readonly dbService: DbService) {}

  async getAll(userId: string) {
    return this.dbService.timeBlock.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async create(dto: TimeBlocksDto, userId: string) {
    return this.dbService.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    dto: Partial<TimeBlocksDto>,
    timeBlockId: string,
    userId: string,
  ) {
    return this.dbService.timeBlock.update({
      where: {
        id: timeBlockId,
        userId,
      },
      data: dto,
    });
  }

  async delete(timeBlockId: string) {
    const timeBlock = await this.dbService.timeBlock.findUnique({
      where: { id: timeBlockId },
    });

    if (!timeBlock) {
      throw new Error(`Timeblock with this id does not exist.`);
    }

    return this.dbService.timeBlock.delete({
      where: { id: timeBlockId },
    });
  }

  async updateOrder(ids: string[]) {
    return this.dbService.$transaction(
      ids.map((id, order) =>
        this.dbService.timeBlock.update({
          where: {
            id,
          },
          data: { order },
        }),
      ),
    );
  }
}
