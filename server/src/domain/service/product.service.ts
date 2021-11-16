import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from '../service/interface/product.service.interface';
import { IProduct } from '../model/product/product.interface';
import { IRepository } from '../output-port/repository.interface';



@Injectable()
export class ProductService implements IProductService {

  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IRepository<IProduct>,
  ) { }


  // Get all category
  async getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]> {
    const products: IProduct[] = await this.productRepository.getAll(page, limit, orderByField, isAscending);
    //console.log(cats);
    return products;
  };

  // Get a single category
  async getById(id: string): Promise<IProduct> {
    const product: IProduct = await this.productRepository.getById(id);
    return product;
  };

  async create(product: IProduct): Promise<boolean> {
    //console.log("product to create:",product);
    const newProduct: Promise<boolean> = this.productRepository.create(product);
    //console.log("product created:",newProducto);
    return newProduct;
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

};
