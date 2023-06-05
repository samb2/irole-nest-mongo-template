import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dtos/profile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req): any {
        const user = req.user;
        const result: ProfileDto = {
            id: user.id,
            email: user.email,
        };
        return result;
    }
}
