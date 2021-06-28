import { IProduct } from '../../model/entity/product.interface';
import { ProductDTO } from '../../model/value_object/product.dto';

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getById(productId: string): Promise<IProduct>;
  create(product: ProductDTO): Promise<IProduct>;
  deleteProduct(productID: string): Promise<any>;
  updateProduct(productID: string, createProductDTO: ProductDTO): Promise<IProduct>;
};


