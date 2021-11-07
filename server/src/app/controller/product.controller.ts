import { Controller, Inject, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { IProductService } from '../../domain/service/interface/product.service.interface';
import { Product } from '../../domain/model/product/product';

export const PRODUCT_SERVICE_TOKEN = 'ProductService_Implementation';

@Controller('catalog/product')
export class ProductController {
    
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: IProductService
    ) {}


    @Get()
    getHello(): string {
      return "Hello World! I'm Product Service...";
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

        // Add Product: /product/create
    @Post('create')
    async createProduct(@Res() res, @Body() createProductDTO: Product) {
            const productCreated = await this.productService.create(createProductDTO);
            if (!productCreated) throw new NotFoundException('Product does not exist or canot delete category!');
            return res.status(HttpStatus.OK).json({
                message: 'Product Successfully Created',
                productCreated
            });
    };

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('delete')
    async deleteProduct(@Res() res, @Query('id') productID) {
        const productDeleted = await this.productService.delete(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    };

    // Update Product: /update?id=5c9d45e705ea4843c8d0e8f7
    @Put('update')
    async updateProduct(@Res() res, @Body() createProductDTO: Product, @Query('id') id) {
        const updatedProduct = await this.productService.updateById(id, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    };


};
