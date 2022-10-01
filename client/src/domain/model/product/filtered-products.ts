import { ProductType } from "./product.type";

export type FilteredProductsDTO = {
    page:  number;
    limit: number;
    count: number;
    list: ProductType[];
};