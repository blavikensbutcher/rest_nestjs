import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth()
  @Get('/u/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Auth()
  @Patch('/u/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Auth()
  @Delete('/u/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
