import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ResUpdateProfileDto {
    @ApiProperty()
    id: Types.ObjectId;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;
}
