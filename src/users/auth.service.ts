import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { bcryptPassword } from '../utils/password';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(email: string, password: string): Promise<User> {
    const users = await this.usersRepo.find({ email });
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // Hash password
    return this.usersRepo.insert({ email, password: bcryptPassword(password) });
  }

  async login(email: string, password: string): Promise<void> {}
}
