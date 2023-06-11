import { Body, Controller, HttpCode, HttpStatus, Post, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    async register(@Body() body: RegisterDto, @I18n() i18n: I18nContext): Promise<any> {
        const userCreated = await this.authService.register(body.email, body.password, i18n);
        if (!userCreated) {
            throw new InternalServerErrorException();
        }
        return {
            success: true,
            status: HttpStatus.CREATED,
            result: 'register successfully!',
        };
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() body: LoginDto): Promise<object> {
        const access_token: string = await this.authService.login(body.email, body.password);
        return {
            success: true,
            status: HttpStatus.OK,
            result: {
                access_token,
            },
        };
    }

    @HttpCode(HttpStatus.OK)
    @Post('/forgotPassword')
    async forgotPassword(@Body() body: ForgotPasswordDto): Promise<any> {
        const result: string = await this.authService.forgotPassword(body.email);
        return {
            success: true,
            status: HttpStatus.OK,
            result,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Post('/resetPassword')
    async resetPassword(@Body() body: ResetPasswordDto): Promise<any> {
        const result: string = await this.authService.resetPassword(body.token, body.password);
        return {
            success: true,
            status: HttpStatus.OK,
            result,
        };
    }
}
