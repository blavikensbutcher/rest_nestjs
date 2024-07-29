import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME || 'refreshToken';

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueTokens(user.id);

    await this.userService.updateUser(user.id, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return { ...user, accessToken: tokens.accessToken };
  }
  async register(dto: AuthDto) {
    const isUserExists = await this.userService.findUserByEmail(dto.email);

    if (isUserExists) throw new ConflictException('User already registered');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.createUser(dto); //Hide password from response

    const tokens = this.issueTokens(user.id);

    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) throw new UnauthorizedException('User or password is wrong');

    return user;
  }

  addRefreshToken(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(
      expiresIn.getDate() + +process.env.EXPIRES_IN_REFRESH_TOKEN,
    );

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.findUserById(
      result.id,
    );

    const tokens = this.issueTokens(user.id);

    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
