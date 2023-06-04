import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/schemas/user.schema';
import { bcryptPassword, comparePassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepo: UsersRepository, private jwtService: JwtService) {}

    async register(email: string, password: string): Promise<User> {
        const users = await this.usersRepo.find({ email });
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
}
