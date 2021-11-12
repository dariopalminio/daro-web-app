import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {

    //@Prop({type: Types.ObjectId})
    //_id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    name: String;

    @Prop()
    description: String;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

