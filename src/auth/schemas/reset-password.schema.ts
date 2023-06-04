import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ResetPassword extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    token: string;

    @Prop({ default: false })
    use: boolean;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
