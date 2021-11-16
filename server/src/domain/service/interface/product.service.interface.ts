import { IProduct } from '../../model/product/product.interface';

export interface IProductService {
  getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]>;
  getById(id: string): Promise<IProduct>;
  create(product: IProduct): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, product: IProduct): Promise<boolean>;
};


