import { FilteredProductsDTO } from "../model/product/filtered-products";
import { ProductType } from "../model/product/product.type";

export interface IProductClient {

    getCatalog: (page: number, limit: number, orderBy: string ,accessToken: string) => Promise<FilteredProductsDTO>;
    getProductDetail: (id: string, accessToken: string) => Promise<ProductType>;
  };