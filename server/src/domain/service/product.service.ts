import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from '../service/interface/product.service.interface';
import { IProduct } from '../model/product/product.interface';
import { IRepository } from '../output-port/repository.interface';


@Injectable()
export class ProductService implements IProductService<IProduct> {

  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IRepository<IProduct>,
  ) { }


  async getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]> {
    const products: IProduct[] = await this.productRepository.getAll(page, limit, orderByField, isAscending);
    return products;
  };

  async getAllActives(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]> {
    const products: IProduct[] = await this.productRepository.find({ active: "true" }, page, limit, orderByField, isAscending);
    return products;
  };

  async find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]> {
    const products: IProduct[] = await this.productRepository.find(query, page, limit, orderByField, isAscending);
    return products;
  };

  async getById(id: string): Promise<IProduct> {
    const product: IProduct = await this.productRepository.getById(id);
    return product;
  };

  async create(product: IProduct): Promise<boolean> {
    //console.log("product to create:",product);
    const newProductCreated: Promise<boolean> = this.productRepository.create(product);
    //console.log("product created:",newProducto);
    return newProductCreated;
  };

  // Delete category return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.productRepository.delete(id);
    return deleted;
  };

  // Put a single category
  async updateById(id: string, product: IProduct): Promise<boolean> {
    const updatedProduct: boolean = await this.productRepository.updateById(id, product);
    return updatedProduct;
  };

  async getByQuery(query: any): Promise<IProduct> {
    const product = await this.productRepository.getByQuery(query);
    return product;
  };

  async update(query: any, valuesToSet: any): Promise<boolean> {
    const updatedProduct: boolean = await this.productRepository.update(query, valuesToSet);
    return updatedProduct;
  };

  async hasById(id: string): Promise<boolean> {
    return await this.productRepository.hasById(id);
  };

  async hasByQuery(query: any): Promise<boolean> {
    return await this.productRepository.hasByQuery(query);
  };

  /**
   * Generate a unique Stock Keeping Unit
   */
  async generateSKU(type: string, brand: string, model: string, color: string, size: string): Promise<string> {
    const maxNumber = 1000; 
    let attemps = 0;
    let alreadyExists: boolean = true;
    let skuGenerated: string;
    do {
      attemps = attemps + 1;
      skuGenerated = this.generateAnySKU(type, brand, model, color, size, maxNumber);
      alreadyExists = await this.productRepository.hasByQuery({ sku: skuGenerated });
    } while ((alreadyExists) && (attemps < maxNumber));
    if (alreadyExists) throw new Error("Failed to generate unique SKU!");
    return skuGenerated;
  };

  generateAnySKU(type: string, brand: string, model: string, color: string, size: string, numberRange: number ): string {
    if (!type || !brand || !model || !color || !size)
      throw new Error("Failed to generate SKU because empty attribute!");
    const separator = "-";
    let firstStr = type.substring(0, 4);
    let secondStr = brand.substring(0, 3);
    let thirdStr = model.substring(0, 3);
    let fourthStr = color.substring(0, 3);
    let fifthStr = size.substring(0, 2);
    let SixStr = Math.floor(Math.random() * numberRange);
    let sku = firstStr + separator + secondStr + separator + thirdStr + separator + fourthStr + separator + fifthStr + separator + SixStr;
    sku = sku.toUpperCase();
    return sku;
  };

};
