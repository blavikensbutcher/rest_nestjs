import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TimeBlocksDto } from './dto/time-blocks.dto';

@Injectable()
export class TimeBlocksService {
  constructor(private readonly dbService: DbService) {}

  async getAll(userId: string) {
    // const args: Prisma.TimeBlockFindManyArgs = {
    //   where: {
    //     userId: userId,
    //   },
    //   orderBy: {
    //     order: 'asc',
    //   },
    // };
    //
    // return this.dbService.timeBlock.findMany(args);

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

  async delete(timeBlockId: string, userId: string) {
    return this.dbService.task.delete({
      where: {
        id: timeBlockId,
        userId,
      },
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
