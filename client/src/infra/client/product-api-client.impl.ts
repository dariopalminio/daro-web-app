
import * as InfraConfig from '../infrastructure.config';
import axios from 'axios';
import { IProductClient } from '../../domain/service/product-client.interface';
import { ProductType } from '../../domain/model/product/product.type';
import { FilteredProductsDTO } from '../../domain/model/product/filtered-products';


export default function ProductApiClientImpl(): IProductClient {


    /**
     * http://localhost:3001/api/webshop/v1/products/catalog?page=1&limit=100&orderBy=name&isAsc=true
     */
    async function getCatalog(page: number, limit: number, orderBy: string ,accessToken: string): Promise<FilteredProductsDTO> {

        //Notification endpoint
        const myURL = `${InfraConfig.APIEndpoints.products}/catalog`;

        console.log("Client ---> getCatalog ************************");
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        params.append('orderBy', orderBy);
        params.append('isAsc', 'true');

        const resp = await axios.get(myURL, { params: params });
        console.log(resp);

        const remoteUrl= InfraConfig.urlImages;
        const datacopy: [] = resp.data.list.map((element: any) => {
            const newImagesUrl: [] = element.images ? element.images.map((imgName: string) => `${remoteUrl}/${imgName}`) : 'NO_IMAGE';
            return { ...element, images: newImagesUrl }

        });

        console.log("**********************************datacopy::::::::::::::::::::", datacopy);
        return {...resp.data, list: datacopy};
    };

    async function getProductDetail(id: string, accessToken: string): Promise<ProductType>{
                //Notification endpoint
                const myURL = `${InfraConfig.APIEndpoints.products}/detail/id/${id}`;
        
                const resp = await axios.get(myURL);
                console.log(resp);
        
                const remoteUrl= InfraConfig.urlImages;
                
                
                const newImagesUrl: [] = resp.data.images ? resp.data.images.map((imgName: string) => `${remoteUrl}/${imgName}`) : 'NO_IMAGE';
                    
        
                return {...resp.data, images: newImagesUrl};
    };

    return {
        getCatalog,
        getProductDetail
    };
};