import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Auth()
  getAllTasks(@CurrentUser('id') userId: string) {
    return this.tasksService.getAllTasks(userId);
  }

  @Auth()
  @HttpCode(201)
  @Post()
  createTask(
    @Body() createTaskDto: TaskDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.tasksService.createTask(createTaskDto, userId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:taskId')
  updateTask(
    @Body() taskDto: TaskDto,
    @CurrentUser('id') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.updateTask(taskDto, taskId, userId);
  }

  @Auth()
  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
