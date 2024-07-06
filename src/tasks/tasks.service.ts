import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DbService } from '../db/db.service';
import { Prisma } from '@prisma/client';

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

  async createTask(dto: CreateTaskDto, userId: string) {
    const data: Prisma.TaskCreateInput = {
      text: dto.text || '',
      isCompleted: dto.isCompleted ?? false,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
      priority: dto.priority,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.dbService.task.create({
      data,
    });
  }

  async updateTask(
    dto: Partial<CreateTaskDto>,
    taskId: string,
    userId: string,
  ) {
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
