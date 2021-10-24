import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  enable: boolean;

  @Prop({ required: true })
  authId: string;

  @Prop({ required: true })
  username: string;

  @Prop({
    required: [true, 'username is required'],
  })
  firstName: string;

  @Prop({
    required: [true, 'lastname is required'],
  })
  lastname: string;

  @Prop({
    unique: [true, 'this email is now exists'],
  })
  email: string;

  @Prop({
    default: false,
  })
  verified: boolean;

  @Prop({
    unique: [true, 'this code is now exists'],
  })
  verificationCode: string;

  @Prop({
    default: Date.now(),
  })
  startVerificationCode: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_COLLECTION_TOKEN = User.name; //'user'; //ModelToken