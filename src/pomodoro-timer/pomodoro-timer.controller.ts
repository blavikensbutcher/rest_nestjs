import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PomodoroTimerService } from './pomodoro-timer.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { PomodoroRoundDto } from './dto/pomodoroRound.dto';

@Controller('user/pomodoro-timer')
export class PomodoroTimerController {
  constructor(private readonly pomodoroTimerService: PomodoroTimerService) {}

  @Get()
  @Auth()
  async getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroTimerService.getTodaySession(userId);
  }

  @HttpCode(201)
  @Post()
  @Auth()
  async createSession(@CurrentUser('id') userId: string) {
    return this.pomodoroTimerService.create(userId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('round/:id')
  async updateRound(dto: PomodoroRoundDto, @Param('id') roundId: string) {
    return this.pomodoroTimerService.updateRound(dto, roundId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  async update(
    dto: PomodoroRoundDto,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroTimerService.update(dto, id, userId);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteSession(@CurrentUser('id' userId: string, @Param('id') id:string){
    return this.pomodoroTimerService.deleteSession(id, userId)
  }
}

