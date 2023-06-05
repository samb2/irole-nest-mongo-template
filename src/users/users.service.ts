import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { ProfileDto } from './dtos/profile.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { Types } from 'mongoose';
import { ResUpdateProfileDto } from './dtos/resUpdateProfile.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepo: UsersRepository) {}

    getProfile(user: User): ProfileDto {
        return {
            id: user.id,
            email: user.email,
        };
    }

    async updateProfile(userId: Types.ObjectId, body: UpdateProfileDto): Promise<ResUpdateProfileDto> {
        const result = await this.usersRepo.findByIdAndUpdate(userId, {
            firstName: body.firstName,
            lastName: body.lastName,
        });

        return {
            id: userId,
            email: result.email,
            firstName: body.firstName,
            lastName: body.lastName,
        };
    }
}
