import Cookies from 'js-cookie';

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
