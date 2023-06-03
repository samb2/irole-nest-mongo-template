import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/schemas/user.schema';
import { bcryptPassword } from '../utils/password';

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
