import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TimeBlocksModule } from './time-blocks/time-blocks.module';
import { PomodoroTimerModule } from './pomodoro-timer/pomodoro-timer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    UserModule,
    CommentsModule,
    AuthModule,
    TasksModule,
    TimeBlocksModule,
    PomodoroTimerModule,
  ],
})
export class AppModule {}
