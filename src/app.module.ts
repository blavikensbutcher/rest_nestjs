import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './users/user.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    UserModule,
    CommentsModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
