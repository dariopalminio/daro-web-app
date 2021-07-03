import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ProductDocument extends Document{

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

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);

