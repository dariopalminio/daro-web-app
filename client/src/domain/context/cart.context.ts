import { createContext } from 'react';

// Global user session context interface for provider
export interface ICartContext {
    cartItems: Array<any>
    cartTotal: number
    setCartItems: (newCartItems: Array<any>) => void
    setCartTotal: (newTotal: number) => void
    addToCart: (item: any) => void
    removeFromCart: (id: string) => void
    getCartCount: () => number
    changeItemQuantity: (id: string, qty: number) => void
};

// Initial values for global user context 
export const CartContextDefaultValues: ICartContext = {
    cartItems: [],
    cartTotal: 0,
    setCartItems: (newCartItems: Array<any>) => { },
    setCartTotal: (newTotal: number) => { },
    addToCart: (item: any) => { },
    removeFromCart: (id: string) => { },
    getCartCount: () => 0,
    changeItemQuantity: (id: string, qty: number) => { }
};

// Global cart context
const CartContext = createContext<ICartContext>(CartContextDefaultValues);

export default CartContext;
