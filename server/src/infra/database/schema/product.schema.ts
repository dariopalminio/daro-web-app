import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Category } from './category.schema';

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

    @Prop({type: [{ type: MongoSchema.Types.ObjectId, ref: 'Category'}] })
    categories: Category[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const PRODUCT_COLLECTION_TOKEN = Product.name; //'products'; //ModelToken