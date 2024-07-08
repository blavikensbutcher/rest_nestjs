import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    await this.authService.addRefreshToken(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.register(dto);
    const refreshToken = response.refreshToken;

    await this.authService.addRefreshToken(res, refreshToken);

    return response;
  }

  @HttpCode(204)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.removeRefreshToken(res);
    return true;
  }

  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const getRefreshToken = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!getRefreshToken) {
      this.authService.removeRefreshToken(res);
      throw new UnauthorizedException(
        'Refresh token has not passed verification',
      );
    }

    const response = await this.authService.getNewTokens(getRefreshToken);

    this.authService.addRefreshToken(res, response.refreshToken);

    return response;
  }
}
