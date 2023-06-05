import { Types } from 'mongoose';

export class ResUpdateProfileDto {
    id: Types.ObjectId;

    email: string;

    firstName: string;

    lastName: string;
}
