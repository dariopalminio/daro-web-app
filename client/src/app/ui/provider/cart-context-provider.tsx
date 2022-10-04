import { FC, useEffect, useState } from "react";
import CartContext from "domain/context/cart.context";
import { useCart } from "domain/hook/cart/cart.hook";

/**
 * Session Context Provider
 */
const CartContextProvider: FC = ({ children }) => {
    const {
        cartItems,
        cartSubTotal,
        setCartItems,
        setCartSubTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity
    } = useCart();


    useEffect(() => {
        console.log('useEffect of CartContextProvider...');
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartSubTotal,
                setCartItems,
                setCartSubTotal,
                addToCart,
                removeFromCart,
                getCartCount,
                changeItemQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
