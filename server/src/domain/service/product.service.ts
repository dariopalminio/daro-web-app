import { Injectable } from '@nestjs/common';
import { IProductService } from '../input/port/IProductService';
import { IProduct } from '../../domain/model/entity/product.interface';
import { ProductDTO } from '../../domain/model/entity/product.dto';

//Mongo
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export const PRODUCT_MODEL_INJECTED='Product_Implementation'; //ModelToken

@Injectable()
export class ProductService implements IProductService{

  constructor(
    @InjectModel(PRODUCT_MODEL_INJECTED) 
    readonly productModel: Model<IProduct>){}

  // Get all products
  async getAll(): Promise<IProduct[]> {
    const products: IProduct[] = await this.productModel.find().exec();
    return products;
  };

  // Get a single Product
  async getById(productId: string): Promise<IProduct> {
    const product: IProduct = await this.productModel.findById(productId).exec();
    return product;
  };

// Post a single product
async create(productDTO: ProductDTO): Promise<IProduct> {
  const newProduct: IProduct = new this.productModel(productDTO);
  return newProduct.save();
}

// Delete Product return this.labelModel.deleteOne({ osCode }).exec();
async deleteProduct(productID: string): Promise<any> {
  const deletedProduct: any = await this.productModel.findByIdAndDelete(productID).exec();
  return deletedProduct;
}

// Put a single product
async updateProduct(productID: string, productDTO: ProductDTO): Promise<IProduct> {
  const updatedProduct: IProduct = await this.productModel
                      .findByIdAndUpdate(productID, productDTO, {new: true});
  return updatedProduct;
}

};
