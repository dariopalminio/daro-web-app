import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  //_id: holds an ObjectId.

  @Prop()
  enable: boolean;

  @Prop({ required: true, unique: true })
  authId: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  docType: string;

  @Prop()
  document: string;

  @Prop()
  telephone: string;

  @Prop()
  language: string;

  @Prop()
  addresses: [{
    street: { type: String }, //street with number
    department: { type: String }, //department, flat or office
    neighborhood: { type: String }, //neighborhood or commune
    city: { type: String }, //city
    state: { type: String }, //state, region or province
    country: { type: String } //country
  }]

  @Prop({
    default: false,
  })
  verified: boolean;

  @Prop()
  verificationCode: string;

  @Prop({
    default: Date.now(),
  })
  startVerificationCode: Date;

/*
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  }*/


}

export const UserSchema = SchemaFactory.createForClass(User);
