import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    @ApiProperty()
    @Optional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @Optional()
    @IsString()
    lastName: string;
}
