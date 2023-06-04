import { Body, Controller, HttpCode, HttpStatus, Post, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    async register(@Body() body: RegisterUserDto): Promise<any> {
        try {
            const userCreated = await this.authService.register(body.email, body.password);
            if (!userCreated) {
                throw new InternalServerErrorException();
            }
            return {
                success: true,
                status: HttpStatus.CREATED,
                result: 'register successfully!',
            };
        } catch (e) {}
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() body: LoginUserDto): Promise<object> {
        const access_token: string = await this.authService.login(body.email, body.password);
        return {
            success: true,
            status: HttpStatus.OK,
            result: {
                access_token,
            },
        };
    }
}
