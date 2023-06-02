import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import Repository from '../database/Repository';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async register() {
    const a = await this.find({});
    console.log('=>(users.repository.ts:15) a', a);
  }
}
