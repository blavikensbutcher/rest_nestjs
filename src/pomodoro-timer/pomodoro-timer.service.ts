import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserService } from '../users/users.service';
import { PomodoroRoundDto } from './dto/pomodoroRound.dto';

@Injectable()
export class PomodoroTimerService {
  constructor(
    private readonly dbService: DbService,
    private readonly userService: UserService,
  ) {}

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.dbService.pomodoro.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        PomodoroRound: {
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    const user = await this.userService.findUserById(userId);

    if (!user) throw new NotFoundException('User not found');

    return this.dbService.pomodoro.create({
      data: {
        PomodoroRound: {
          createMany: {
            data: Array.from({ length: user.intervalCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        PomodoroRound: true,
      },
    });
  }

  async update(
    dto: Partial<PomodoroRoundDto>,
    pomodoroId: string,
    userId: string,
  ) {
    return this.dbService.pomodoro.update({
      where: {
        userId,
        id: pomodoroId,
      },
      data: dto,
    });
  }

  async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
    return this.dbService.pomodoroRound.update({
      where: {
        id: roundId,
      },
      data: dto,
    });
  }

  async deleteSession(sessionId: string, userId: string) {
    return this.dbService.pomodoro.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
}
