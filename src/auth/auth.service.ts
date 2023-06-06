import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/schemas/user.schema';
import { bcryptPassword, comparePassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ResetPasswordRepository } from './resetPassword.repository';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private jwtService: JwtService,
        private readonly resetRepo: ResetPasswordRepository,
    ) {}

    async register(email: string, password: string): Promise<User> {
        const users: User[] = await this.usersRepo.find({ email });
        if (users.length) {
            throw new BadRequestException('email in use');
        }
        // Hash password
        return this.usersRepo.insert({ email, password: bcryptPassword(password) });
    }

    async login(email: string, password: string): Promise<string> {
        const user: User = await this.usersRepo.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }
        const checkPassword: boolean = comparePassword(password, user.password);
        if (!checkPassword) {
            throw new UnauthorizedException();
        }
        const payload: object = { sub: user._id, email: user.email };
        return await this.jwtService.signAsync(payload);
    }

    async validateUserById(userId: Types.ObjectId): Promise<any> {
        const user = await this.usersRepo.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async forgotPassword(email: string): Promise<string> {
        const userExist = await this.usersRepo.findOne({ email });
        if (userExist) {
            const payload: object = { email };
            const token: string = await this.jwtService.signAsync(payload);
            await this.resetRepo.insert({ token, email });
        }
        return 'Email Send Successfully';
    }

    async resetPassword(token, password): Promise<string> {
        // Check Token
        const checkVerify: any = await this.jwtService.verify(token);
        const resetPassword = await this.resetRepo.findOne({ token });

        if (!resetPassword || resetPassword.use || checkVerify.email !== resetPassword.email) {
            throw new ForbiddenException('This Token Expired');
        }
        // Update User Password & set reset Password as used
        await this.usersRepo.findOneAndUpdate({ email: resetPassword.email }, { password: bcryptPassword(password) });
        await this.resetRepo.tokenUsed(token);

        return 'Your password Changed Successfully';
    }
}
