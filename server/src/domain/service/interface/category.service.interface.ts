import { ICategory } from '../../model/category/category.interface';


export interface ICategoryService {
  getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<ICategory[]>;
  find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<ICategory[]>;
  getById(id: string): Promise<ICategory>;
  create(categoryDTO: ICategory): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, category: ICategory): Promise<boolean>;
};

