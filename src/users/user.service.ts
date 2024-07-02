import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async createUser(createUserDto: Prisma.UserCreateInput) {
    const salt = await bcrypt.genSalt();
    const user = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, salt),
    };

    return this.dbService.user.create({ data: user });
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
        pomodoro: true,
        timeBlock: true,
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
        pomodoro: true,
        timeBlock: true,
        task: true,
        comment: true,
      },
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const data = updateUserDto;

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordNormalize = String(data.password);
      data.password = await bcrypt.hash(passwordNormalize, salt);
    }

    return this.dbService.user.update({
      where: {
        id,
      },
      data,
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
