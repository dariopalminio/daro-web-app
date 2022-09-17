import { FunctionComponent, useContext, useState } from 'react'
import "./cart.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// Components
import CartItem from "./cart-item";
import Button from "../../common/button/button";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';


const Cart: FunctionComponent = () => {

    const { cartItems,
        cartTotal,
        setCartItems,
        setCartTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;


    useEffect(() => {

    }, []);



    const getCartSubTotal = () => {
        return cartTotal;
    };


    const handleContinue = () => {
        console.log('handleContinue... TODO');
    };


    return (
        <>
            <div className="cartscreen">
                <div className="cartscreen__left">
                    <h2>Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div>
                            Tu carrito esta vacio <Link to="/">Volver</Link>
                        </div>
                    ) : (
                        <div>

                            <div className="cartitems-header">
                                <p ></p>
                                <p >Name</p>
                                <p >Price</p>
                                <p >Quantity</p>
                                <p >Amount</p>
                                <p ></p>
                            </div>

                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    qtyChangeHandler={changeItemQuantity}
                                    removeHandler={removeFromCart}
                                />
                            ))}

                        </div>
                    )}
                </div>

                <div className="cartscreen__right">
                    <div className="cartscreen__info">
                        <p>Subtotal ({getCartCount()}) Productos</p>
                        <p>${getCartSubTotal()}</p>
                    </div>
                    <div>
                        <Button 
                             onClick={handleContinue}>
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cart;