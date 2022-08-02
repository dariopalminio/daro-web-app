import { IPersistentAggregate } from '../../model/persistent.aggregate.interface';
import { IProduct } from '../../model/product/product.interface';

export interface IProductService<T> extends IPersistentAggregate<T>{
    
    getAllActives(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]>;
    generateSKU(type: string, brand: string, model: string, color: string, size: string ): Promise<string>;
};


