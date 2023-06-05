import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateProfileDto {
    @Optional()
    @IsString()
    firstName: string;

    @Optional()
    @IsString()
    lastName: string;
}
