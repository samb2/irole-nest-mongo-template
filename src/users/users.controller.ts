import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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
