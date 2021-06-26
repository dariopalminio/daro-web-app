import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop({ required: true })
    name: String;

    @Prop()
    description: String;

    @Prop()
    imageURL: String;

    @Prop()
    price: Number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);