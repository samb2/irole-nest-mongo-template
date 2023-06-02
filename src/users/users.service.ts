import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(email: string, password: string): Promise<void> {
    await this.usersRepository.register();
    console.log(email, password);
    // const user = new this.userModel({ email, password });
    // return user.save();
  }
}
