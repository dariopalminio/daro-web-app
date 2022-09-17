import { FunctionComponent } from 'react'


// Components
import CartItem from "../../component/cart/cart-item";
import Cart from '../../component/cart/cart';

export const CartPage: FunctionComponent = () => {
  return (
    <div className="container-page">
      <Cart />
    </div>
  );
};