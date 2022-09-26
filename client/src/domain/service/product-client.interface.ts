export interface IProductClient {

    getCatalog: (accessToken: string) => Promise<any>;
    getProductDetail: (id: string, accessToken: string) => Promise<any>;
  };