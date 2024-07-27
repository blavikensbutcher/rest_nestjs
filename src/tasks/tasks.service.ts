import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { DbService } from '../db/db.service';
import { Priority } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DbService) {}

  async getAllTasks(userId: string) {
    return this.dbService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async createTask(dto: TaskDto, userId: string) {
    return this.dbService.task.create({
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

  async updateTask(dto: Partial<TaskDto>, taskId: string, userId: string) {
    return this.dbService.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: dto,
    });
  }

  async deleteTask(taskId: string) {
    return this.dbService.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
