import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/schemas/user.schema';
import { bcryptPassword, comparePassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const users = await this.usersRepo.find({ email });
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // Hash password
    return this.usersRepo.insert({ email, password: bcryptPassword(password) });
  }

  async login(email: string, password: string): Promise<any> {
    const user: User = await this.usersRepo.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const checkPassword: boolean = comparePassword(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    // const payload = { sub: user._id, username: user.email };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
