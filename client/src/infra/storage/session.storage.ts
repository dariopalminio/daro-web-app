import { DefaultSession } from '../../domain/model/auth/default-session';
import { SessionType } from '../../domain/model/auth/session.type';

//name in session/local storage
const SESSION_ITEM_NAME: string = "APP_SESSION_DATA";

/**
 * Function: Recovery session data from web browser Storage (storage)
 * @returns SessionType
 */
export const recoverySessionFromStorage = (): SessionType => {

  if (typeof Storage !== "undefined") {
    // Code when Storage is supported

    const sessionStorageItem = window.sessionStorage.getItem(SESSION_ITEM_NAME);
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
    if (sessionToLoad) {
      const sessionStorageItem: string = JSON.stringify(sessionToLoad);
      window.sessionStorage.setItem(SESSION_ITEM_NAME, sessionStorageItem);
    }
  }
};

export const clearSessionToStorage = (): void => {
  window.sessionStorage.setItem(SESSION_ITEM_NAME, '');
};

export const getAccessToken = (): string => {
  const session: SessionType = recoverySessionFromStorage();
  if (session)
    return session.access_token ? session.access_token : '';
  return '';
};

export const getRefreshToken = (): string => {
  const session: SessionType = recoverySessionFromStorage();
  if (session)
    return session.refresh_token ? session.refresh_token : '';
  return '';
};


