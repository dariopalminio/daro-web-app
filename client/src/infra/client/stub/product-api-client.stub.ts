
import { IProductClient } from '../../../domain/service/product-client.interface';

export default function ProductClientStub(): IProductClient {

    const productsFake: Array<any> = [
        { _id: "1", sku: "1324", name: "name", images: ["http://localhost:3001/public/img/magic-unicorn-toy-01.jpg"], grossPrice: 23.4, description: "description1", stock: 1, category: "toy" },
        { _id: "2", sku: "1234", name: "name2", images: ["http://localhost:3001/public/img/octopus-plush-toy-01.jpg"], grossPrice: 34, description: "description2", stock: 1, category: "toy" },
        { _id: "3", sku: "134", name: "name3", images: ["http://localhost:3001/public/img/airbag-vest-01.jpg"], grossPrice: 5, description: "description3", stock: 1, category: "toy" },
        { _id: "4", sku: "1222", name: "name4", images: ["http://localhost:3001/public/img/pijama-rabah-01.png", "http://localhost:3001/public/img/pijama-rabah-02.png", "http://localhost:3001/public/img/pijama-rabah-03.png"], grossPrice: 0, description: "description4", stock: 1, category: "toy" },
        { _id: "5", sku: "1333", name: "name4", images: ["https://www.biografiasyvidas.com/monografia/einstein/fotos/einstein_1947.jpg", "https://historia.nationalgeographic.com.es/medio/2018/02/27/einstein3__550x807.JPG"], grossPrice: 0, description: "description4", stock: 1, category: "toy" },
        { _id: "6", sku: "1444", name: "name4", images: ["http://localhost:3001/public/img/pijama-rabah-03.png"], grossPrice: 88, description: "description4", stock: 1 },
    ];

    const productDetailed: any ={
        "_id": "632df7695a88c40e4fa634f6",
        "sku": "PIJAMAS-RABAH",
        "barcode": "5111407592",
        "name": "Pijama Unisex Bebé Vaca",
        "description": "Pijama enterito para bebé diseño vaca",
        "images": [
            "airbag-vest-01.jpg",
            "airbag-vest-02.jpg",
            "airbag-vest-03.jpg",
            "airbag-vest-04.jpg"
        ],
        "category": "Security",
        "type": "Pijama",
        "brand": "Vaca",
        "color": "Negro",
        "model": "Pulpo",
        "gender": "Unisex",
        "size": "M",
        "grossPrice": 13900,
        "stock": 6,
        "active": true,
        "__v": 0
    };

/**
 * Stub function
 */
function getCatalog(accessToken: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const data: any = productsFake;
           resolve(data);
     });
  };

/**
 * Stub function
 */
 function getProductDetail(id: string, accessToken: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const data: any = productDetailed;
           resolve(data);
     });
  };

return {
    getCatalog,
    getProductDetail
};
};
