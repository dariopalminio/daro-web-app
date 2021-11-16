import { Injectable, Inject } from '@nestjs/common';
import { ICategory } from '../model/category/category.interface';
import { Category } from '../model/category/category';
import { CategoryDTO } from '../model/category/category.dto';
import { IRepository } from '../output-port/repository.interface';
import { ICategoryService } from '../service/interface/category.service.interface';


@Injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: IRepository<ICategory>,
  ) { }

  // Get all category
  async getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<ICategory[]> {
    /*if (page && limit &&  orderByField){}

    }*/
    const cats: ICategory[] = await this.categoryRepository.getAll(page, limit, orderByField, isAscending);
    return cats;
  };

  // Get a single category
  async getById(id: string): Promise<ICategory> {
    const category: ICategory = await this.categoryRepository.getById(id);
    return category;
  };

  async create(categoryDTO: CategoryDTO): Promise<boolean> {
    const newCat: Promise<boolean> = this.categoryRepository.create(categoryDTO);
    console.log(newCat);
    return newCat;
  };

  // Delete category return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.categoryRepository.delete(id);
    return deleted;
  };

  // Put a single category
  async updateById(id: string, category: ICategory): Promise<boolean> {
    const updatedProduct: boolean = await this.categoryRepository.updateById(id, category);
    return updatedProduct;
  };

};
