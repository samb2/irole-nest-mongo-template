import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { ProfileDto } from './dtos/profile.dto';
import { ResUpdateProfileDto } from './dtos/resUpdateProfile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req): ProfileDto {
        return this.usersService.getProfile(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('profile')
    async updateProfile(@Request() req, @Body() body: UpdateProfileDto): Promise<ResUpdateProfileDto> {
        return this.usersService.updateProfile(req.user.id, body);
    }
}
