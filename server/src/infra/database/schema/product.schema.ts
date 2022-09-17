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
    netCost: Number; 
    //purchase net price or amount of the purchase, before including VAT

    @Prop()
    ivaAmountOnCost: Number; 
    //IVA value of purchase or VAT amount on netCost (value added tax)
    

    @Prop()
    grossCost: Number; 
    //gross value of purchase to provider

    @Prop()
    netPrice: Number; 
    //netPrice price of sale or Net amount: It is the amount of the sale, before including VAT.
    //netPrice = (grossPrice * 100) / (100 + %IVA)

    @Prop()
    ivaAmountOnPrice: Number; 
    //IVA value of sale or VAT amount (value added tax): 
    //Corresponds to an additional X% based on the net amount. If the ticket is exempt, the value remains at $0.
    //ivaAmountOnPrice = ((netPrice * %IVA)/100)

    //Amount not affected or exempt: This amount will be different from $0 when the tax document is an exempt ticket or is not affected by VAT.

    @Prop()
    grossPrice: Number; 
    //Total amount with VAT included or gross Price: 
    //Equivalent to the sum of the totals (net, VAT and exempt) according to the type of document. It is the amount consumer paid.
    //gross price of sale, grossPrice = netPrice + ivaAmountOnPrice
    //grossPrice = netPrice + ((netPrice * %IVA)/100)
    //The prices in television commercials, catalogues, internet and in the straps of the gondolas 
    //is published with VAT included.

    
    @Prop({ required: true })
    stock: number; //value of inventory existence 

    @Prop()
    active: Boolean; //is active to sell?
}

export const ProductSchema = SchemaFactory.createForClass(Product);
