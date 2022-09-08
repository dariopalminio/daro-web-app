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

  //addressInfo {address, department, region, comuna, additionalReferences}
  @Prop()
  addresses: [{
    street: { type: String },
    department: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String }
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
}

export const UserSchema = SchemaFactory.createForClass(User);
