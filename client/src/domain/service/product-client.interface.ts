import { CategoryType } from "domain/model/category/category.type";
import { FilteredProductsDTO } from "../model/product/filtered-products";
import { ProductType } from "../model/product/product.type";

export interface IProductClient {

    getCatalog: (category: string, page: number, limit: number, orderBy: string) => Promise<FilteredProductsDTO>;
    getProductDetail: (id: string) => Promise<ProductType>;
    getCategories: () => Promise<Array<CategoryType>>;
  };