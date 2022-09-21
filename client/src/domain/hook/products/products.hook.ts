import { useContext, useState } from 'react';
import { ApiError } from '../../../infra/client/api.error';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IProfileClient } from '../../service/profile-client.interface';
import { IHookState, InitialState } from '../hook.type';


const productsFake: Array<any> = [
    {_id: "1", name: "name", images:["http://localhost:3001/public/img/magic-unicorn-toy-01.jpg"], grossPrice:23.4,description:"description1", stock:1},
    {_id: "2", name: "name2", images:["http://localhost:3001/public/img/octopus-plush-toy-01.jpg"], grossPrice:34,description:"description2", stock:1},
    {_id: "3", name: "name3", images:["http://localhost:3001/public/img/airbag-vest-01.jpg"], grossPrice:5,description:"description3", stock:1},
    {_id: "4", name: "name4", images:["http://localhost:3001/public/img/pijama-rabah-01.png"], grossPrice:0,description:"description4", stock:1},
    {_id: "4", name: "name4", images:["http://localhost:3001/public/img/pijama-rabah-02.png"], grossPrice:0,description:"description4", stock:1},
    {_id: "4", name: "name4", images:["http://localhost:3001/public/img/pijama-rabah-03.png"], grossPrice:88,description:"description4", stock:1},
];


/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useProducts(authClientInjected: IAuthTokensClient | null = null) {

    const [state, setState] = useState<IHookState>(InitialState);
    const [products, setProducts] = useState<Array<any>>([]);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;

    const getCatalog = async () => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

     
        try {

            const fetchData = async () => {
                function sleep(ms: number) {
                  return new Promise(resolve => setTimeout(resolve, ms));
                }
                // waits for 1000ms
                await sleep(200000);
               
                return 'Hello World';
              };
              const result = fetchData()
          // make sure to catch any error
          .catch(console.error);;
            //let info = await profClient.getProfileService(userName);
            setProducts(productsFake);
          
            setState({ isProcessing: false, hasError: false, msg: "Success", isSuccess: true });
            return;

        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status===400 || error.status===401)) {
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
        products,
        getCatalog
    };
};