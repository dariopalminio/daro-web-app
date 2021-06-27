import { Test, TestingModule } from '@nestjs/testing';
import { ProductService, PRODUCT_MODEL_INJECTED } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { IProduct } from '../../domain/model/entity/product.interface';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Query } from 'mongoose';
import { Product, ProductDocument } from '../../infrastructure/database/schema/product.schema';

/**
name: String;
description: String;
imageURL: String;
price: Number;
sku:  String;
barcode:  String;
stock: number;

    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly sku:  String;
    readonly barcode:  String;
    readonly stock: number;
 */

interface ProductInterface{
    id: string;
         name: string;
         description: string;
         imageURL: string;
         price: number;
         sku:  String;
         barcode:  String;
         stock: number;
    };

//Functio that return params following ProductInterface
const mockProduct = (
    id= '60d7f311934cfde9acfe7f90',
    name = 'product name 1',
    description = "Example",
    imageURL = "https://cdn.icon-icons.com/icons/PNG/image.png",
    price = 1000,
    sku = "11111111",
    barcode = "0",
    stock = 0
  ): ProductInterface => ({
    id,
    name,
    description,
    imageURL,
    price,
    sku,
    barcode,
    stock,
  });

// still lazy, but this time using an object instead of multiple parameters
const mockProductDoc = (mock?: Partial<ProductInterface>): Partial<ProductDocument> => ({
    _id: mock?.id || 'a uuid',
    name: 'product name 1',
    description: "Example",
    imageURL: "https://cdn.icon-icons.com/icons/PNG/image.png",
    price: 1000,
    sku: "11111111",
    barcode: "0",
    stock: 0
  });

  const productArray = [
    mockProduct(),
    mockProduct( '60d7f311934cfde9acfe7f92','product name 2',"Example 2","https://cdn.icon-icons.com/icons/PNG/image.png", 1000,"11111111","0",0),
    mockProduct( '60d7f311934cfde9acfe7f93','product name 3',"Example 3","https://cdn.icon-icons.com/icons/PNG/image.png", 1000,"11111111","0",0),
  ];

  const productDocArray = [
    mockProductDoc(),
    mockProductDoc({    
    name: 'product name 2',
    description: "Example",
    imageURL: "https://cdn.icon-icons.com/icons/PNG/image.png",
    price: 1000,
    sku: "11111111",
    barcode: "0",
    stock: 0}),
    mockProductDoc({    
        name: 'product name 3',
        description: "Example",
        imageURL: "https://cdn.icon-icons.com/icons/PNG/image.png",
        price: 1000,
        sku: "11111111",
        barcode: "0",
        stock: 0}),
  ];

  describe('UsersService', () => {
    let service: ProductService;
    let model: Model<ProductDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ProductService,
            {
              provide: getModelToken(PRODUCT_MODEL_INJECTED),
              // notice that only the functions we call from the model are mocked
              useValue: {
                new: jest.fn().mockResolvedValue(mockProduct()),
                constructor: jest.fn().mockResolvedValue(mockProduct()),
                find: jest.fn(),
                findOne: jest.fn(),
                update: jest.fn(),
                create: jest.fn(),
                remove: jest.fn(),
                exec: jest.fn(),
              },
            },
          ],
        }).compile();
    
        service = module.get<ProductService>(ProductService);
        model = module.get<Model<ProductDocument>>(getModelToken(PRODUCT_MODEL_INJECTED));
      });


      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });


      it('should return all products', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(productDocArray),
          } as any);
        const products = await service.getAll();
        //this.productModel.find()
        console.log(products);
        expect(products).toEqual(productDocArray);
      });

});
