import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<void> {
    await this.authService.register(body.email, body.password);
    console.log(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    console.log(body);
  }
}
