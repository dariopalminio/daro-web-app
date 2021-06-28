import { Test, TestingModule } from '@nestjs/testing';
import { ProductService, PRODUCT_MODEL_TOKEN } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
//import { IProduct } from '../../domain/model/entity/product.interface';
import { ProductDTO } from '../../domain/model/entity/product.dto';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Query } from 'mongoose';
import { Product, ProductDocument } from '../../infrastructure/database/schema/product.schema';

const mockArrayResult = [
    {
        "_id": "60d8f02e11d897f930de4d53",
        "name": "Mesa",
        "description": "Blanca",
        "imageURL": "https://images1.png",
        "price": 23000,
        "sku": "MES-BLA-WHI-COT",
        "barcode": "MES-BLA-1234",
        "stock": 4,
        "__v": 0
    },
    {
        "_id": "60d8f09711d897f930de4d55",
        "name": "Laptop",
        "description": "MacBook Air",
        "imageURL": "https://images2.png",
        "price": 23000,
        "sku": "LAP-MAC-WHI-COT",
        "barcode": "LAP-MAC-1234",
        "stock": 2,
        "__v": 0
    }
];

const mockProd = {
    "_id": "60d8f09711d897f930de4d55",
    "name": "Laptop",
    "description": "MacBook Air",
    "imageURL": "https://images2.png",
    "price": 23000,
    "sku": "LAP-MAC-WHI-COT",
    "barcode": "LAP-MAC-1234",
    "stock": 2,
    "__v": 0
};

const mockProductDoc = (mock?: Partial<ProductDTO>): Partial<ProductDocument> => ({
    "_id": "60d8f09711d897f930de4d55",
    "name": "Laptop",
    "description": "MacBook Air",
    "imageURL": "https://images2.png",
    "price": 23000,
    "sku": "LAP-MAC-WHI-COT",
    "barcode": "LAP-MAC-1234",
    "stock": 2,
    "__v": 0
});

const mockProductDocDeleted = (): Partial<ProductDocument> => ({
    "_id": "60d8f09711d897f930de4d55",
    "name": "Laptop",
    "description": "MacBook Air",
    "imageURL": "https://images2.png",
    "price": 23000,
    "sku": "LAP-MAC-WHI-COT",
    "barcode": "LAP-MAC-1234",
    "stock": 2,
    "__v": 0
});

describe('ProductService', () => {
    let service: ProductService;
    let model: Model<ProductDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    //getModelToken() function returns a prepared injection token based on a token name. 
                    //Using this token, you can easily provide a mock implementation using any of the standard 
                    //custom provider techniques, including useClass, useValue, and useFactory. 
                    provide: getModelToken(PRODUCT_MODEL_TOKEN),
                    // notice that only the functions we call from the model are mocked
                    useValue: {
                        new: jest.fn().mockResolvedValue(new ProductDTO()),
                        constructor: jest.fn().mockResolvedValue(new ProductDTO()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        findById: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        model = module.get<Model<ProductDocument>>(getModelToken(PRODUCT_MODEL_TOKEN));
    });


    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('productService.getAll should return all products', async () => {

        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockArrayResult),
        } as any);

        const products = await service.getAll();
        expect(products).toEqual(mockArrayResult);
    });

    it('productService.getById should getOne by id', async () => {

        jest.spyOn(model, 'findById').mockReturnValueOnce(
            createMock<Query<ProductDocument, ProductDocument>>({
                exec: jest
                    .fn()
                    .mockResolvedValueOnce(mockProductDoc(new ProductDTO())),
            }),
        );

        const findMockProdDoc = mockProductDoc(new ProductDTO());
        const response = await service.getById(mockProductDoc()._id);
        expect(response).toEqual(findMockProdDoc);
    });

    it.skip('productService.updateProduct should update a product successfully', async () => {

        jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
            createMock<Query<ProductDocument, ProductDocument>>({
                exec: jest.fn().mockResolvedValueOnce(mockProd),
            }),
        );

        const updatedCat = await service.updateProduct(mockProductDoc()._id, new ProductDTO());
        expect(updatedCat).toEqual(mockProd);
    });


    /**
     * productService.deleteProduct...
         Controller return:
       "productDeleted": {
        "_id": "60d90e99575a0cfff55a315f",
        "name": "Mesa",
        "description": "MacBook Air",
        "imageURL": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80",
        "price": 23000,
        "sku": "312312342342",
        "barcode": "312312342342",
        "stock": 2,
        "__v": 0
    }
    */

    it('productService.deleteProduct should return that it did delete a Product', async () => {

        jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce(
            createMock<Query<ProductDocument, ProductDocument>>({
                exec: jest.fn().mockResolvedValueOnce(mockProductDocDeleted()),
            }),
        );

        const productDeleted = await service.deleteProduct(mockProductDoc()._id);
        expect(productDeleted).toEqual(mockProductDocDeleted());
    });


});
