import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Param('userId') userId: string) {
    return this.tasksService.getAllTasks(userId);
  }

  @Post('/:userId')
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('userId') userId: string,
  ) {
    return this.tasksService.createTask(createTaskDto, userId);
  }
}
