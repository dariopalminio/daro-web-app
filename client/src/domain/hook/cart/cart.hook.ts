import { useState, useEffect } from 'react'
import { CartItemType } from '../../model/cart/cart-item.type';
import { ProductType } from '../../model/product/product.type';
import { v4 as uuidv4 } from 'uuid';

const CART_ITEM_NAME = 'CART';

/**
 * Cart Custom Hook
 */
export const useCart = () => {
    const [cartItems, setCartItems] = useState<Array<CartItemType>>([]);
    const [cartSubTotal, setCartSubTotal] = useState(0);

    useEffect(() => {
        const cartStorageItem = window.sessionStorage.getItem(CART_ITEM_NAME);
        const cartJSONString: string = cartStorageItem ? cartStorageItem : "";
        let myCartRecovered: Array<CartItemType>;
        if (cartJSONString !== "") {
            try {
                myCartRecovered = JSON.parse(cartJSONString);
                setCartItems(myCartRecovered);
            } catch (error) {
                setCartItems([]);
                console.log('Cannot load cart items from storage. ', error);
            }
        }
    }, []);

    useEffect(() => {
        calculateTotals(); //update calculated values
    }, [cartItems]);

    const calculateTotals = () => {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalVal += cartItems[i].amount;
        }
        setCartSubTotal(totalVal);
    };

    const addToCart = (productItem: ProductType, qty: number) => {
        const newItem: CartItemType = { itemId: uuidv4(), productId: productItem._id, imageUrl: productItem.images[0], name: productItem.name, grossPrice: productItem.grossPrice, qty: qty, stock: productItem.stock, amount: (productItem.grossPrice * qty) };
        const newCartItems = [...cartItems, newItem];
        setCartItems(newCartItems);
        saveCart(newCartItems);
    }

    const removeFromCart = (id: string) => {
        setCartItems((currentCart) => {
            const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.itemId === id);

            if (indexOfItemToRemove === -1) {
                return currentCart;
            }
            const newCartItems = [
                ...currentCart.slice(0, indexOfItemToRemove),
                ...currentCart.slice(indexOfItemToRemove + 1),
            ];
            saveCart(newCartItems);
            return newCartItems;
        });

    };

    const getCartCount = (): number => {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalVal += cartItems[i].qty;
        }
        return totalVal;
    };

    const changeItemQuantity = (id: string, qty: number) => {
        const indexToUpdate = cartItems.findIndex((cartItem) => cartItem.itemId === id);
        const searchObject = cartItems[indexToUpdate];
        const itemChanged = {
            ...searchObject,
            qty: qty,
            amount: qty * searchObject.grossPrice
        }
        let newCartItems = [...cartItems];
        newCartItems[indexToUpdate] = itemChanged;
        setCartItems(newCartItems);
        saveCart(newCartItems);
    };

    const saveCart = (items: Array<CartItemType>) => {
        const sessionStorageItem: string = JSON.stringify(items);
        window.sessionStorage.setItem(CART_ITEM_NAME, sessionStorageItem);
    };

    return {
        cartItems,
        cartSubTotal,
        setCartItems,
        setCartSubTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity
    };
};