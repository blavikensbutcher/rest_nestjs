import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { DbService } from '../db/db.service';

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
    const taskList = await this.getTaskByUserIdAndText(dto.text, userId);

    for (let i = 0; i < taskList.length - 1; i++) {
      if (
        taskList[i].createdAt === taskList[i + 1].createdAt &&
        taskList[i].text === taskList[i + 1].text
      ) {
        throw new BadRequestException('Task on this time already exists');
      }
    }

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

  async getTaskByUserIdAndText(text: string, userId: string) {
    return this.dbService.task.findMany({
      where: {
        userId,
        text,
      },
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
