import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly dbService: DbService) {}
  async create(createCommentDto: Prisma.CommentCreateInput) {
    return this.dbService.comment.create({ data: createCommentDto });
  }

  async findAll() {
    return this.dbService.comment.findMany({});
  }

  async findOne(id: number) {
    return this.dbService.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCommentDto: Prisma.CommentUpdateInput) {
    return this.dbService.comment.update({
      where: {
        id,
      },
      data: updateCommentDto,
    });
  }

  async remove(id: number) {
    return this.dbService.comment.delete({
      where: {
        id,
      },
    });
  }
}
