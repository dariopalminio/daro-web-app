import { Injectable } from '@nestjs/common';
import { IProductService } from '../input/port/IProductService';
import { Product } from '../../domain/model/entity/product.interface';
import { CreateProductDTO } from '../../application/dto/create.product.dto';


//Mongo
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export const PRODUCT_MODEL_NAME='Product';

@Injectable()
export class ProductService implements IProductService{

  constructor(@InjectModel(PRODUCT_MODEL_NAME) readonly productModel: Model<Product>){}

  // Get all products
  async getAll(): Promise<Product[]> {
    const products: Product[] = await this.productModel.find();
    return products;
  };

  // Get a single Product
  async getById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return product;
  };

// Post a single product
async create(createProductDTO: CreateProductDTO): Promise<Product> {
  const newProduct = new this.productModel(createProductDTO);
  return newProduct.save();
}

// Delete Product return this.labelModel.deleteOne({ osCode }).exec();
async deleteProduct(productID: string): Promise<any> {
  const deletedProduct = await this.productModel.deleteOne({ productID }).exec();
  return deletedProduct;
}

// Put a single product
async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
  const updatedProduct = await this.productModel
                      .findByIdAndUpdate(productID, createProductDTO, {new: true});
  return updatedProduct;
}

};
