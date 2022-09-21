import { FunctionComponent, useContext } from "react";
import { useTranslation } from 'react-i18next';
import "./cart-top-menu.css";
import { useHistory } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import IconButton from "../../../common/icon-button/icon-button";
import CartContext, { ICartContext } from "../../../../../domain/context/cart.context";

//@material-ui https://v4.mui.com/
//import IconButton from "@material-ui/core/IconButton";


/**
 * Cart Icon Button
 */
const CartTopMenu: FunctionComponent = () => {
  const { t } = useTranslation();
  const { cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
    addToCart,
    removeFromCart,
    getCartCount,
    changeItemQuantity } = useContext(CartContext) as ICartContext;

  const history = useHistory();

  const handleViewCart = () => {
    history.push("/cart");
  };

  return (
    <IconButton
    onClick={handleViewCart}
  >
    <div className="cart-circle" >
      <span id="cart_count" data-action="cart-can" className="badge rounded-circle">{getCartCount()}</span>
    </div>
    
    <RiShoppingCart2Fill size={20}/>

  </IconButton>
  );
};

export default CartTopMenu;
