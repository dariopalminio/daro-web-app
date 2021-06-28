import { Controller, Inject, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { IProductService } from '../../domain/input/port/product.service.interface';
import { ProductDTO } from '../../domain/model/value_object/product.dto';

export const PRODUCT_SERVICE_TOKEN = 'ProductService_Implementation';

@Controller('product')
export class ProductController {
    
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: IProductService
    ) {}


    @Get()
    getHello(): string {
      return "Hello World! I'm Product Service...";
    };
    
    // Add Product: /product/create
    @Post('create')
    async createProduct(@Res() res, @Body() createProductDTO: ProductDTO) {
        const product = await this.productService.create(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    };

    // Get Products /product/all
    @Get('all')
    async getProducts(@Res() res) {
        const products = await this.productService.getAll();
        return res.status(HttpStatus.OK).json(products);
    }

    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/id/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getById(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    };

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('delete')
    async deleteProduct(@Res() res, @Query('id') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    };

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('update')
    async updateProduct(@Res() res, @Body() createProductDTO: ProductDTO, @Query('productID') productID) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    };


}
