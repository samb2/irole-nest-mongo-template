import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/register')
  register(@Body() body: RegisterUserDto) {
    console.log(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    console.log(body);
  }
}
