import { IProduct } from '../../model/product/product.interface';
import { IPersistentService } from '../../service/interface/persistent.service.interface';

export interface IProductService<T> extends IPersistentService<T>{
/*  getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]>;
  find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]>;
  getById(id: string): Promise<IProduct>;
  create(product: IProduct): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, product: IProduct): Promise<boolean>;
  */
};


