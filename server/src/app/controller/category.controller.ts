import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ICategoryService } from '../../domain/service/interface/category.service.interface';
import { ICategory } from '../../domain/model/category/category.interface';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('categories')
export class CategoryController {

  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService<ICategory>,
    @Inject('IGlobalConfig')
    private readonly globalConfig: IGlobalConfig,
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
      status: HttpStatus.OK,
      message: "Hello World from category service " + this.globalConfig.get<string>('VERSION') + "!",
      name: "category",
      version: this.globalConfig.get<string>('VERSION'),
      date: new Date()
    };
    return res.status(200).json(response);
  };

  // Get Products /product/all
  // http://localhost:3001/api/webshop/v1/catalog/category/all?page=1&limit=2&orderBy=name&isAsc=true
  @Get('all')
  async getAll(@Res() res, @Query('page') pageParam, @Query('limit') limitParam, @Query('orderBy') orderBy, @Query('isAsc') isAsc) {
    try {
      if (pageParam && limitParam && orderBy && isAsc) {
        const page: number = parseInt(pageParam);
        const limit: number = parseInt(limitParam);
        const orderByField: string = orderBy.toString();
        const isAscending: boolean = (isAsc === 'true') ? true : false;
        const list = await this.categoryService.getAll(page, limit, orderByField, isAscending);
        return res.status(HttpStatus.OK).json(list);
      } else {
        const list = await this.categoryService.getAll();
        return res.status(HttpStatus.OK).json(list);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
  };

  // GET single Category: /product/5c9d46100e2e5c44c444b2d1
  @Get('/id/:categoryID')
  async getById(@Res() res, @Param('categoryID') categoryID) {
    let category: any;
    try {
      category = await this.categoryService.getById(categoryID);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
    if (!category) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json(category);
  };

  // Add Category: /category/create
  @Post('create')
  async createCategory(@Res() res, @Body() createCategoryDTO: ICategory) {
    let categoryCreated: boolean;
    try {
      categoryCreated = await this.categoryService.create(createCategoryDTO);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
    if (!categoryCreated) throw new NotFoundException('Category does not exist or canot delete category!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Created Successfully',
      created: categoryCreated
    });
  };

  // Delete Category: /delete?id=5c9d45e705ea4843c8d0e8f7
  @Delete('delete')
  async deleteCategory(@Res() res, @Query('id') id) {
    let categoryDeleted: boolean;;
    try {
      categoryDeleted = await this.categoryService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
    if (!categoryDeleted) throw new NotFoundException('Category does not exist or canot delete category!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Deleted Successfully',
      deleted: categoryDeleted
    });
  };

  // Update Category: /update?id=5c9d45e705ea4843c8d0e8f7
  @Put('update')
  async updateProduct(@Res() res, @Body() categoryDTO: ICategory, @Query('id') categoryID) {
    let updatedCategory: boolean;
    try {
      updatedCategory = await this.categoryService.updateById(categoryID, categoryDTO);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
    if (!updatedCategory) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Successfully',
      updated: updatedCategory
    });
  };

};