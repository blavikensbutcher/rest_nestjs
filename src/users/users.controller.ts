import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

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
  @Get('/profile')
  getUserProfile(@CurrentUser('id') userId: string) {
    return this.userService.getUserProfile(userId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('/profile')
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UserDto) {
    return this.userService.updateUser(userId, dto);
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
