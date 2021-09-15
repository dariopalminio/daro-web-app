import { ICategory } from '../../model/category/category.interface';


export interface ICategoryService {
  getAll(): Promise<ICategory[]>;
  getById(id: string): Promise<ICategory>;
  create(categoryDTO: ICategory): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  update(id: string, category: ICategory): Promise<boolean>;
};

