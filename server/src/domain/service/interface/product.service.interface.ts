import { IPersistentAggregateService } from './persistent.aggregate.interface';
import { IProduct } from '../../model/product/product.interface';
import { CatalogDTO } from 'src/domain/model/product/catalog.dto';

export interface IProductService<T> extends IPersistentAggregateService<T>{
    
    getAllActives(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IProduct[]>;
    generateSKU(type: string, brand: string, model: string, color: string, size: string ): Promise<string>;
    getCatalog(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<CatalogDTO[]> ;
};


