import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException } from '@nestjs/common';
import { ICategoryService } from '../../domain/service/interface/category.service.interface';
import { ICategory } from '../../domain/model/category/category.interface';
import * as GlobalConfig from '../../infra/config/global-config';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('catalog/category')
export class CategoryController {

  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService
  ) { }

  @ApiOperation({
    summary:
      'Hello world is get method to do Ping and test this service.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Succefully Ping',
    type: HelloWorldDTO,
  })
  @Get()
  getHello(@Res() res) {
    const response: HelloWorldDTO = {
      isSuccess: true,
      status: 200,
      message: "Hello World from category service " + GlobalConfig.VERSION + "!",
      name: "category",
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };

  // Get Products /product/all
  @Get('all')
  async getAll(@Res() res) {
    const products = await this.categoryService.getAll();
    return res.status(HttpStatus.OK).json(products);
  };

  // GET single Category: /product/5c9d46100e2e5c44c444b2d1
  @Get('/id/:categoryID')
  async getById(@Res() res, @Param('categoryID') categoryID) {
    const category = await this.categoryService.getById(categoryID);
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
    const updatedCategory = await this.categoryService.updateById(categoryID, categoryDTO);
    if (!updatedCategory) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Successfully',
      updatedCategory
    });
  };

};