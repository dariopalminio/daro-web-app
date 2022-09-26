
import { IProductClient } from '../../../domain/service/product-client.interface';
import ProductApiClientImpl from '../product-api-client.impl';
import ProductClientStub from '../stub/product-api-client.stub';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class ProductApiClientFactory {
    static create(fake: boolean): IProductClient{
        //Return a factory function
        if (fake) return ProductClientStub(); //fake for test
        return ProductApiClientImpl(); //Real api
    }
};
