import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { CategoryDocument } from '../../../infrastructure/database/schema/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product extends Document{

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

    //@Prop([{type: MongoSchema.Types.ObjectId, ref: 'Category'}])
    //categories: CategoryDocument[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);

