import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.dbService.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.dbService.user.findMany({});
  }

  async findUserById(id: string) {
    return this.dbService.user.findUnique({
      where: {
        id,
      },
      include: {
        task: true,
        comment: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.dbService.user.findUnique({
      where: {
        email,
      },
      include: {
        comment: true,
      },
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.dbService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      include: {
        comment: true,
      },
    });
  }

  async remove(id: string) {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
