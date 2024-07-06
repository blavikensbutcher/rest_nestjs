import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { DbService } from '../db/db.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService],
  exports: [UserService],
})
export class UserModule {}
