import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  enable: boolean;

  @Prop({ required: true, unique: true })
  authId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop({
    default: false,
  })
  verified: boolean;

  @Prop({
    unique: true,
  })
  verificationCode: string;

  @Prop({
    default: Date.now(),
  })
  startVerificationCode: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_COLLECTION_TOKEN = User.name; //'user'; //ModelToken