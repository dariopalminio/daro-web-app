
import { FunctionComponent, useContext } from 'react'
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import CartItem from "../../component/cart/cart-item";
import Cart from "../../component/cart/cart";

/**
 * CartPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
export const CartPage: FunctionComponent = () => {
    const { cartItems,
        cartTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;

    const getCartSubTotal = () => {
        return cartTotal;
    };

    const handleContinue = () => {
        //TODO
        console.log('handleContinue... TODO');
    };

    return (
        <div className="container-page">
            <Cart
                empty={cartItems.length === 0}
                count={getCartCount()}
                subtotal={getCartSubTotal()}
                onClick={handleContinue}
            >
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        qtyChangeHandler={changeItemQuantity}
                        removeHandler={removeFromCart}
                    />
                ))}

            </Cart>
        </div>
    );
};