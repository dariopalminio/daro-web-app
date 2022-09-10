import Cookies from 'js-cookie';
import { DefaultSession } from '../../domain/model/auth/default-session';
import { SessionType } from '../../domain/model/auth/session.type';

//name in session/local storage
const SESSION_ITEM_NAME: string = "APP_SESSION_DATA";


/**
 * Get Item from sessionStorage
 * @param key 
 * @returns 
 */
export function getFromSession( key: string ) {
    return window.sessionStorage.getItem(key);
};

/**
 * Set Item in sessionStorage
 * @param key 
 * @param item 
 */
export function setInSession( key: string, item: string ) {
    return window.sessionStorage.setItem(key, item);
};  

/**
 * Get Item from cookies
 * @param key 
 * @returns 
 */
export function getFromCookies( key: string ) {
    return Cookies.get(key);
};

/**
 * Set Item in Cookies
 * @param key 
 * @param item 
 * @returns 
 */
export function setInCookies( key: string, item: string ) {
    return Cookies.set(key, item);
};  

/**
 * Function: Recovery session data from web browser Storage (storage)
 * @returns 
 */
 export const recoverySessionFromStorage = (): SessionType => {

    if (typeof Storage !== "undefined") {
      // Code when Storage is supported
  
      const sessionStorageItem = getFromSession(SESSION_ITEM_NAME);
      const sessionJSONString: string = sessionStorageItem ? sessionStorageItem : "";
  
      if (sessionJSONString && sessionJSONString !== "") {
        try {
          const mySessionRecovered: SessionType = JSON.parse(sessionJSONString);
          return mySessionRecovered;
        } catch (error) {
          console.log(error)
        }
      }
    }
    //Code when Storage is NOT supported
    return DefaultSession;
  };

  /**
 * Function: set session data to web browser Storage in storage
 * @param sessionToLoad 
 */
export const setSessionToStorage = (sessionToLoad: SessionType): void => {
    if (typeof Storage !== "undefined") {
      // Code when Storage is supported
      const sessionStorageItem: string = JSON.stringify(sessionToLoad);
      setInSession(SESSION_ITEM_NAME, sessionStorageItem);
    }
  };

  export const getAccessToken = (): string => {
    const session: SessionType = recoverySessionFromStorage();
    return session.access_token ? session.access_token : '';
  };
  
  export const getRefreshToken = (): string => {
    const session: SessionType = recoverySessionFromStorage();
    return session.refresh_token ? session.refresh_token : '';
  };


