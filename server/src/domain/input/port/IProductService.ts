import { ContactMessage } from '../../model/value_object/ContactMessage';
import { Product } from '../../model/entity/product.interface';
import { CreateProductDTO } from '../../../application/dto/create.product.dto';

export interface IProductService {
  getAll(): Promise<Product[]>;
  getById(productId: string): Promise<Product>;
  create(product: CreateProductDTO): Promise<Product>;
  deleteProduct(productID: string): Promise<any>;
  updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>;
};


