import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException } from '@nestjs/common';
import { IUserService } from '../../domain/service/interface/user.service.interface';
import { IUser } from '../../domain/model/user/user.interface';
import { UserDTO } from '../../domain/model/user/user-register.dto.type';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {

  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService<IUser>,
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
      message: "Hello World from product user " + this.globalConfig.get<string>('VERSION') + "!",
      name: "user",
      version: this.globalConfig.get<string>('VERSION'),
      date: new Date()
    };
    return res.status(200).json(response);
  };

  // Get Products /product/all
  @Get('all')
  async getAll(@Res() res, @Query('page') pageParam, @Query('limit') limitParam, @Query('orderBy') orderBy, @Query('isAsc') isAsc) {

    if (pageParam && limitParam && orderBy && isAsc) {
      const page: number = parseInt(pageParam);
      const limit: number = parseInt(limitParam);
      const orderByField: string = orderBy.toString();
      const isAscending: boolean = (isAsc === 'true') ? true : false;
      const list = await this.userService.getAll(page, limit, orderByField, isAscending);
      return res.status(HttpStatus.OK).json(list);
    } else {
      const list = await this.userService.getAll();
      return res.status(HttpStatus.OK).json(list);
    }
  };

  // GET single Category: /product/5c9d46100e2e5c44c444b2d1
  @Get('/id/:userID')
  async getById(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getById(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  };

  // Add User: /user/create
  @Post('create')
  async createUser(@Res() res, @Body() userRegisterDTO: UserDTO) {
    const categoryCreated = await this.userService.create(userRegisterDTO);
    if (!categoryCreated) throw new NotFoundException('User does not exist or canot delete user!');
    return res.status(HttpStatus.OK).json({
      message: 'User Created Successfully',
      categoryCreated
    });
  };

  // Delete Category: /delete?id=5c9d45e705ea4843c8d0e8f7
  @Delete('delete')
  async deleteUser(@Res() res, @Query('id') id) {
    const categoryDeleted = await this.userService.delete(id);
    if (!categoryDeleted) throw new NotFoundException('User does not exist or canot delete user!');
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted Successfully',
      categoryDeleted
    });
  };

  // Update Category: /update?id=5c9d45e705ea4843c8d0e8f7
  @Put('update')
  async updateUser(@Res() res, @Body() user: IUser, @Query('id') categoryID) {
    const updatedCategory = await this.userService.updateById(categoryID, user);
    if (!updatedCategory) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User Updated Successfully',
      updatedCategory
    });
  };


}
