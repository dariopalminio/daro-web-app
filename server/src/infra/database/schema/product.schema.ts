import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

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
    images: [String]; //array of images name

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
    netCost: Number; //purchase net price

    @Prop()
    ivaAmountOnCost: Number; //IVA value of purchase
    
    @Prop()
    grossCost: Number; //gross value of purchase to provider

    @Prop()
    netPrice: Number; //gross price of sale

    @Prop()
    ivaAmountOnPrice: Number; //IVA value of sale

    @Prop()
    grossPrice: Number; //gross price of sale

    @Prop({ required: true })
    stock: number; //value of inventory existence 

    @Prop()
    active: Boolean; //is active to sell?
}

export const ProductSchema = SchemaFactory.createForClass(Product);
