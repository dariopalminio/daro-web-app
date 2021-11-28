import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../domain/service/product.service'; 
import { IRepository } from '../../../domain/output-port/repository.interface';
import { IProduct } from '../../../domain/model/product/product.interface';


class ProductRepositoryNegativeStub implements IRepository<IProduct> {
    async getAll(): Promise<IProduct[]> {
        return [];
    };
    async find(query: any): Promise<IProduct[]> {
        return [];
    }
    async getById(id: string): Promise<IProduct> {
        return null;
    };
    async getByQuery(query: any): Promise<IProduct> {
        return null;
    }
    async hasById(id: string): Promise<boolean> {
        return false;
    }
    async hasByQuery(query: any): Promise<boolean> {
        return false;
    }
    async create<IProduct>(product: IProduct): Promise<boolean> {
        return false;
    };
    async updateById(id: string, product: IProduct): Promise<boolean> {
        return false;
    };
    async update(query: any, valuesToSet: any): Promise<boolean> {
        return false;
    };
    async delete(id: string): Promise<boolean> {
        return false;
    };
};

describe('ProductService', () => {
    let service: ProductService;
    let repo: IRepository<IProduct>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    //getModelToken() function returns a prepared injection token based on a token name. 
                    //Using this token, you can easily provide a mock implementation using any of the standard 
                    //custom provider techniques, including useClass, useValue, and useFactory. 
                    provide: 'ProductRepository',
                    // notice that only the functions we call from the model are mocked
                    useValue: new ProductRepositoryNegativeStub(),
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });


    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('productService.getAll should return an empty array', async () => {
        const products = await service.getAll();
        expect(products.length).toEqual(0);
    });

    it('productService.delete should return false', async () => {
        const deleted = await service.delete("");
        expect(deleted).toEqual(false);
    });

    it('productService.updateById should return false', async () => {
        const deleted = await service.updateById("",null);
        expect(deleted).toEqual(false);
    });

    it('productService.create should return false', async () => {
        const deleted = await service.create(null);
        expect(deleted).toEqual(false);
    });

});
