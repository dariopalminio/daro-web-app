import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    //_id: holds an ObjectId.

    @Prop({ required: true })
    name: String;

    @Prop()
    description: String;

    @Prop()
    imageURL: String;

    @Prop()
    price: Number;

    @Prop()
    sku:  String;
    
    @Prop()
    barcode:  String;

    @Prop() 
    stock: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);