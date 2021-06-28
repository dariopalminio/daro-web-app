import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class CategoryDocument extends Document {
    //_id: holds an ObjectId.

    @Prop({ required: true, unique: true })
    name: String;

    @Prop()
    description: String;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);