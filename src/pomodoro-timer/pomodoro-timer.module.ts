import { Module } from '@nestjs/common';
import { PomodoroTimerService } from './pomodoro-timer.service';
import { PomodoroTimerController } from './pomodoro-timer.controller';
import { UserService } from '../users/users.service';

@Module({
  imports: [UserService],
  controllers: [PomodoroTimerController],
  providers: [PomodoroTimerService],
})
export class PomodoroTimerModule {}
