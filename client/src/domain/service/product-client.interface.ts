import { ProductType } from "../model/product/product.type";

export interface IProductClient {

    getCatalog: (accessToken: string) => Promise<Array<ProductType>>;
    getProductDetail: (id: string, accessToken: string) => Promise<ProductType>;
  };