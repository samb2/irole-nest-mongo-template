import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<any> {
    return this.authService.register(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body.email, body.password);
  }
}
