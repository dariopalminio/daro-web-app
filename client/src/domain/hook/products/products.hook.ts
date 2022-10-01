import { useContext, useState } from 'react';
import { ApiError } from '../../../infra/client/api.error';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { FilteredProductsDTO } from '../../model/product/filtered-products';
import { ProductType } from '../../model/product/product.type';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IProductClient } from '../../service/product-client.interface';
import { IHookState, InitialState } from '../hook.type';

/**
 * use Product
 * Custom hook
 * 
 * @returns 
 */
export default function useProducts(authClientInjected: IAuthTokensClient | null = null,
    productClientInjected: IProductClient | null = null) {

    const [state, setState] = useState<IHookState>(InitialState);
    const [products, setProducts] = useState<Array<ProductType>>([]);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [product, setProduct] = useState<ProductType|null>(null);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const productClient: IProductClient = productClientInjected ? productClientInjected : StateConfig.productClient;
    const LIMIT = 8;

    const getCatalog = async (page: number) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        try {
            const data: FilteredProductsDTO = await productClient.getCatalog(page, LIMIT, "name", "withOutAcces");

            console.log("hook getCatalog data:", data);

            setProducts(data.list);
            setPage(data.page);
            const max = Math.round((data.count/LIMIT)+0.4);
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

    const getDetail = async (id: string) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        try {
            const data = await productClient.getProductDetail(id, "withOutAcces");

            console.log("hook Detail data:", data);

            setProduct(data);

            setState({ isProcessing: false, hasError: false, msg: "Success", isSuccess: true });
            return data;
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


    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        page,
        maxPage,
        products,
        product,
        getCatalog,
        getDetail
    };
};