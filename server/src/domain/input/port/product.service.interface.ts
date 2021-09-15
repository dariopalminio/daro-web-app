import { IProduct } from '../../model/product/product.interface';

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getById(id: string): Promise<IProduct>;
  create(product: IProduct): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  update(id: string, product: IProduct): Promise<boolean>;
};


