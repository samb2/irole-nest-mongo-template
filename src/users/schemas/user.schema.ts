import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    firstName: string;

    @Prop({ required: false })
    lastName: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDelete: boolean;

    @Prop({ default: false })
    superAdmin: boolean;

    @Prop({ default: false })
    admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
