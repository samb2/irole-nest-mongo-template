import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(email: string, password: string): Promise<void> {
    // const b = await this.usersRepo.insert({ email, password });
    // console.log('=>(users.service.ts:13) b', b);
    // const user = new this.userModel({ email, password });
    // return user.save();
  }
}
