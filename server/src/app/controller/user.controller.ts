import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException } from '@nestjs/common';
import { IUserService } from '../../domain/input/port/user.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';
import { StartConfirmEmailData } from '../../domain/model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../domain/model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../../domain/model/register/verification_code_data.dto.type';
import { IUser } from '../../domain/model/user/user.interface';
import { UserRegisterDTO } from '../../domain/model/register/user_register.dto.type';
export const USER_SERVICE_TOKEN = 'UserService_Implementation';

@Controller('user')
export class UserController {

  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService
  ) { }


  @Get()
  getHello(): string {
    return "Hello World! I'm user Service...";
  };

  // Get Products /product/all
  @Get('all')
  async getAll(@Res() res) {
    const products = await this.userService.getAll();
    return res.status(HttpStatus.OK).json(products);
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
  async createUser(@Res() res, @Body() userRegisterDTO: UserRegisterDTO) {
    const categoryCreated = await this.userService.create(userRegisterDTO);
    if (!categoryCreated) throw new NotFoundException('User does not exist or canot delete category!');
    return res.status(HttpStatus.OK).json({
      message: 'User Created Successfully',
      categoryCreated
    });
  };

  // Delete Category: /delete?id=5c9d45e705ea4843c8d0e8f7
  @Delete('delete')
  async deleteUser(@Res() res, @Query('id') id) {
    const categoryDeleted = await this.userService.delete(id);
    if (!categoryDeleted) throw new NotFoundException('User does not exist or canot delete category!');
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
      message: 'Category Updated Successfully',
      updatedCategory
    });
  };

  @Post('sendStartEmailConfirm')
  sendStartEmailConfirm(@Body() startConfirmEmailData: StartConfirmEmailData): any {
    console.log(startConfirmEmailData);

    try {
      const sentInfo = this.userService.sendStartEmailConfirm(startConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('sendEndEmailConfirm')
  sendEndEmailConfirm(@Body() sendConfirmEmailData: EndConfirmEmailData): any {
    console.log(sendConfirmEmailData);

    try {
      const sentInfo = this.userService.sendEndEmailConfirm(sendConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('isVerificationCodeOk')
  async isVerificationCodeOk(@Body()  verificationCodeData: VerificationCodeDataDTO): Promise<any> {
    return this.userService.isVerificationCodeOk(verificationCodeData);

};

}
