import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { startOfDay, subDays } from 'date-fns';
import { UserDto } from './dto/user.dto';

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

  async findUserById(userId: string) {
    const user = await this.dbService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        pomodoro: true,
        timeBlock: true,
        task: true,
        comment: true,
      },
    });

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.dbService.user.findUnique({
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

    return user;
  }

  async updateUser(userId: string, updateUserDto: Prisma.UserUpdateInput) {
    const data = updateUserDto;

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordNormalize = String(data.password);
      data.password = await bcrypt.hash(passwordNormalize, salt);
    }

    return this.dbService.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async getUserProfile(userId: string) {
    const profile = await this.findUserById(userId);

    const totalTasks = profile.task.length;
    const completedTasks = await this.dbService.task.count({
      where: {
        userId,
        isCompleted: true,
      },
    });

    const currentDay = startOfDay(new Date());
    const currentWeek = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.dbService.task.count({
      where: {
        userId,
        createdAt: {
          gte: currentDay.toISOString(),
        },
      },
    });

    const weekTasks = await this.dbService.task.count({
      where: {
        userId,
        createdAt: {
          gte: currentWeek.toISOString(),
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, accessToken, refreshToken, ...rest } = profile;

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

  async remove(userId: string) {
    return this.dbService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
