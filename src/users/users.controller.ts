import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<void> {
    await this.usersService.register(body.email, body.password);
    console.log(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    console.log(body);
  }
}
