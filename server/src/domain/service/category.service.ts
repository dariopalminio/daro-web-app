import { Injectable, Inject } from '@nestjs/common';
import { ICategory } from '../model/category/category.interface';
import { Category } from '../model/category/category';
import { CategoryDTO } from '../model/category/category.dto';
import { IRepository } from '../../domain/output/port/repository.interface';
import { ICategoryService } from '../input/port/category.service.interface';

export const CATEGORY_REPOSITORY_TOKEN = 'CategoryRepository_Implementation'; //ModelToken

@Injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: IRepository<ICategory>,
  ) { }

  // Get all category
  async getAll(): Promise<ICategory[]> {
    const cats: ICategory[] = await this.categoryRepository.getAll();
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
  async update(id: string, category: ICategory): Promise<boolean> {
    const updatedProduct: boolean = await this.categoryRepository.update(id, category);
    return updatedProduct;
  };

};
