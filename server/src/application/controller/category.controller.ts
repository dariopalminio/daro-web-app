import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException } from '@nestjs/common';
import { ICategoryService } from '../../domain/input/port/category.service.interface';
import { ICategory } from '../../domain/model/category/category.interface';

export const CATEGORY_SERVICE_TOKEN = 'CategoryService_Implementation';

@Controller('catalog/category')
export class CategoryController {

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN)
    private readonly categoryService: ICategoryService
  ) { }

  @Get()
  getHello(): string {
    return "Hello World! I'm Category Service...";
  };

  // Get Products /product/all
  @Get('all')
  async getAll(@Res() res) {
    const products = await this.categoryService.getAll();
    return res.status(HttpStatus.OK).json(products);
  };

  // GET single Category: /product/5c9d46100e2e5c44c444b2d1
  @Get('/id/:categoryID')
  async getById(@Res() res, @Param('categoryID') productID) {
    const category = await this.categoryService.getById(productID);
    if (!category) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json(category);
  };

  // Add Category: /category/create
  @Post('create')
  async createCategory(@Res() res, @Body() createCategoryDTO: ICategory) {
    const categoryCreated = await this.categoryService.create(createCategoryDTO);
    if (!categoryCreated) throw new NotFoundException('Category does not exist or canot delete category!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Created Successfully',
      categoryCreated
    });
  };

  // Delete Category: /delete?id=5c9d45e705ea4843c8d0e8f7
  @Delete('delete')
  async deleteProduct(@Res() res, @Query('id') id) {
    const categoryDeleted = await this.categoryService.delete(id);
    if (!categoryDeleted) throw new NotFoundException('Category does not exist or canot delete category!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Deleted Successfully',
      categoryDeleted
    });
  };

  // Update Category: /update?id=5c9d45e705ea4843c8d0e8f7
  @Put('update')
  async updateProduct(@Res() res, @Body() categoryDTO: ICategory, @Query('id') categoryID) {
    const updatedCategory = await this.categoryService.update(categoryID, categoryDTO);
    if (!updatedCategory) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Successfully',
      updatedCategory
    });
  };

};