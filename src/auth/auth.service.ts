import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(credentials: Prisma.UserCreateInput) {
    try {
      const userData = await this.usersService.create(credentials);
      console.log('user data', userData);
      return this.jwtService.sign({ id: userData.id });
    } catch (e) {
      console.error(e);
      throw new ForbiddenException('Something went wrong');
    }
  }

  async login(user) {
    console.log('user', user);
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
