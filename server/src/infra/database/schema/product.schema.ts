import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    //_id: holds an ObjectId.

    @Prop()
    sku:  String; //Stock-keeping unit of 12 digits
    
    @Prop()
    barcode:  String; //UPC - Universal Product Code (EAN, ISBN, GTIN, Part number)

    @Prop({ required: true })
    name: String;

    @Prop()
    description: String;

    @Prop()
    imageURL: String; //image name

    @Prop()
    category: String;

    @Prop()
    type: String; //Sub-category
    
    @Prop()
    brand: String;

    @Prop()
    color: String;

    @Prop()
    model: String;

    @Prop()
    gender: String;

    @Prop()
    size: String;

    @Prop()
    cost: Number; //value of purchase to provider

    @Prop()
    price: Number; //price of sale

    @Prop({ required: true })
    stock: number; //value of inventory existence 

}

export const ProductSchema = SchemaFactory.createForClass(Product);
