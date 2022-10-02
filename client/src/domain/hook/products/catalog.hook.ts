import { useContext, useEffect, useState } from 'react';
import { ApiError } from '../../../infra/client/api.error';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../../infra/global.config';
import { FilteredProductsDTO } from '../../model/product/filtered-products';
import { ProductType } from '../../model/product/product.type';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IProductClient } from '../../service/product-client.interface';
import { IHookState, InitialState } from '../hook.type';

/**
 * use Catalog
 * Custom hook
 * 
 * @returns 
 */
export default function useCatalog(authClientInjected: IAuthTokensClient | null = null,
    productClientInjected: IProductClient | null = null) {

    const [state, setState] = useState<IHookState>(InitialState);
    const [products, setProducts] = useState<Array<ProductType>>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const productClient: IProductClient = productClientInjected ? productClientInjected : StateConfig.productClient;

    const [categories, setCategories] = useState<Array<string>>([]);
    const [categorySelected, setCategorySelected] = useState<string>('');


    const LIMIT_ITEMS_BY_PAGE = 8;

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
    
          return await getCatalog(1); //search data
        };
    
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
    
      }, [categorySelected]);
      
    const getCategories =  () => {
        setCategories(["toy","Fragrance","Security"]);
    };

    const getCatalog = async (page: number) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
console.log(`******************************getCatalog page ${page} categorySelected ${categorySelected}`);
        try {
            const data: FilteredProductsDTO = await productClient.getCatalog(categorySelected, page, LIMIT_ITEMS_BY_PAGE, "name");

            console.log("hook getCatalog data:", data);

            setProducts(data.list);
            setPage(data.page);
            const max = Math.round((data.count/LIMIT_ITEMS_BY_PAGE)+0.4);
            setMaxPage(max);

            setState({ isProcessing: false, hasError: false, msg: "Success", isSuccess: true });
            return;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }
    };

    const getNextPage = async () =>{
        if (page!==maxPage) await getCatalog(page + 1); //search data
      }
    
      const getPreviousPage = async () =>{
        console.log();
        if (page>0) await getCatalog(page - 1); //search data
      }


    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        page,
        maxPage,
        products,
        getCatalog,
        getPreviousPage,
        getNextPage,
        categories, categorySelected, setCategorySelected, getCategories
    };
};