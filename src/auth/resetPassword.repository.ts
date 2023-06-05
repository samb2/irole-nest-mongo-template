import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Repository from '../database/Repository';
import { ResetPassword } from './schemas/reset-password.schema';

@Injectable()
export class ResetPasswordRepository extends Repository<ResetPassword> {
    constructor(@InjectModel(ResetPassword.name) private userModel: Model<ResetPassword>) {
        super(userModel);
    }

    async tokenUsed(token: string): Promise<any> {
        return this.findOneAndUpdate({ token }, { use: true });
    }
}
