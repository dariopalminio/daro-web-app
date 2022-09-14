import { FunctionComponent } from 'react'
import "./cart.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";



// Components
import CartItem from "./cart-item";

const Cart: FunctionComponent = () => {

    const CART_INITIAL_STATE = {
        cartItems: [
            { imageUrl: "urlImage", name: "Product Name", price: 23, product: "1", qty: 1, countInStock: 1 }
        ],
    };
    const { cartItems } = CART_INITIAL_STATE;

    const removeItem = (e: any) => {
        console.log(e);
    };

    // @ts-ignore
    const qtyChangeHandler = (id, qty) => {
        console.log("qtyChangeHandler");
    };

    // @ts-ignore
    const removeFromCartHandler = (id) => {
        console.log("removeFromCartHandler");
    };

    const getCartCount = () => {
        //return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        return 1;
    };

    const getCartSubTotal = () => {
        //return cartItems
        //  .reduce((price, item) => price + item.price * item.qty, 0)
        //  .toFixed(2);
        return 10;
    };


    return (
        <>
            <div className="cartscreen">
                <div className="cartscreen__left">
                    <h2>Carrito de compras</h2>

                    {cartItems.length === 0 ? (
                        <div>
                            Tu carrito esta vacio <Link to="/">Volver</Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.product}
                                item={item}
                                qtyChangeHandler={qtyChangeHandler}
                                removeHandler={removeFromCartHandler}
                            />
                        ))
                    )}
                </div>

                <div className="cartscreen__right">
                    <div className="cartscreen__info">
                        <p>Subtotal ({getCartCount()}) Productos</p>
                        <p>${getCartSubTotal()}</p>
                    </div>
                    <div>
                        <button>Pagar</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cart;