import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
    @ApiProperty()
    id: Types.ObjectId;

    @ApiProperty()
    email: string;
}
