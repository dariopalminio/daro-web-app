import React, { useState, useEffect } from 'react'

const CART_INITIAL_STATE: Array<any> =
    [
        { id: "1", imageUrl: "https://i0.wp.com/historiasdelahistoria.com/wordpress-2.3.1-ES-0.1-FULL/wp-content/uploads/2015/09/manzana.jpg", name: "Product Name1", price: 34, qty: 1, countInStock: 3, amount: 34 },
        { id: "2", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name2", price: 5, qty: 2, countInStock: 4, amount: 10 }
    ];

/**
 * Cart Custom Hook
 */
export const useCart = () => {
    const [cartItems, setCartItems] = useState<Array<any>>(CART_INITIAL_STATE);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        console.log('useEffect of Cart Custom Hook...');
        console.log("Cart!!!");
        console.log("cartItems:", cartItems);
        total();
    }, [cartItems]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalVal += cartItems[i].amount;
        }
        setCartTotal(totalVal);
    };

    // @ts-ignore
    const addToCart = (item) => setCartItems((currentCart) => [...currentCart, item]);

    // @ts-ignore
    const removeFromCart = (id) => {
        setCartItems((currentCart) => {
            const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === id);

            if (indexOfItemToRemove === -1) {
                return currentCart;
            }

            return [
                ...currentCart.slice(0, indexOfItemToRemove),
                ...currentCart.slice(indexOfItemToRemove + 1),
            ];
        });
    };

    const getCartCount = () => {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalVal += cartItems[i].qty;
        }
        return totalVal;
    };

    
    // @ts-ignore
    const changeItemQuantity = (id, qty) => {

        const indexToUpdate = cartItems.findIndex((cartItem) => cartItem.id === id);
        console.log("indexToUpdate:", indexToUpdate);

        const searchObject = cartItems[indexToUpdate];

        const itemChanged = {
            ...searchObject,
            qty: qty,
            amount: qty * searchObject.price
        }
        console.log("itemChanged:", itemChanged);

        let newarray = [...cartItems];

        newarray[indexToUpdate] = itemChanged;

        setCartItems(newarray);

        console.log(`qtyChangeHandler id ${id} qty ${qty}`);
        total();
    };

    return {
        cartItems,
        cartTotal,
        setCartItems,
        setCartTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity
    }
}