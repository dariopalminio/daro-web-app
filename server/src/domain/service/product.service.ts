import { Injectable, Inject } from '@nestjs/common';
import { IProductService } from '../input/port/product.service.interface';
import { IProduct } from '../../domain/model/entity/product.interface';
import { ProductDTO } from '../model/value_object/product.dto';
import { IRepository } from '../../domain/output/port/repository.interface';


//export const PRODUCT_COLLECTION_TOKEN = 'products'; //ModelToken

export const PRODUCT_REPOSITORY_TOKEN = 'ProductRepository_Implementation'; //ModelToken

@Injectable()
export class ProductService implements IProductService {

  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IRepository<IProduct>,
  ) { }


  // Get all category
  async getAll(): Promise<IProduct[]> {
    const cats: IProduct[] = await this.productRepository.getAll();
    console.log(cats);
    return cats;
  };

  // Get a single category
  async getById(id: string): Promise<IProduct> {
    const product: IProduct = await this.productRepository.getById(id);
    return product;
  };

  async create(product: IProduct): Promise<boolean> {
    const newProducto: Promise<boolean> = this.productRepository.create(product);
    console.log(newProducto);
    return newProducto;
  };

  // Delete category return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.productRepository.delete(id);
    return deleted;
  };

  // Put a single category
  async update(id: string, category: IProduct): Promise<boolean> {
    const updatedProduct: boolean = await this.productRepository.update(id, category);
    return updatedProduct;
  };

};
