import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { startOfDay, subDays } from 'date-fns';

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

  async updateUser(id: string, updateUserDto: Prisma.UserUpdateInput) {
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

  async getUserProfile(id: string) {
    const profile = await this.findUserById(id);

    const totalTasks = profile.task.length;
    const completedTasks = this.dbService.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const currentDay = startOfDay(new Date());
    const currentWeek = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.dbService.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: currentDay.toISOString(),
        },
      },
    });

    const weekTasks = await this.dbService.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: currentWeek.toISOString(),
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = profile;

    return {
      user: rest,
      statistics: [
        { label: 'Total', value: totalTasks },
        { label: 'Completed tasks', value: completedTasks },
        { label: 'Today tasks', value: todayTasks },
        { label: 'Week tasks', value: weekTasks },
      ],
    };
  }

  async remove(id: string) {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
