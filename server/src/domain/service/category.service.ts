import { Injectable, Inject } from '@nestjs/common';
import { ICategory } from '../../domain/model/entity/category.interface';
import { Category } from '../../domain/model/entity/category';
import { CategoryDTO } from '../model/value_object/category.dto';
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
    console.log(cats);
    return cats;
  };

  // Get a single category
  async getById(id: string): Promise<ICategory> {
    const product: ICategory = await this.categoryRepository.getById(id);
    return product;
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
