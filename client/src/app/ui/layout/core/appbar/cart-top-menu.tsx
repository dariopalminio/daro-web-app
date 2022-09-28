import { FunctionComponent, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import IconButton from "../../../common/icon-button/icon-button";
import CartContext, { ICartContext } from "../../../../../domain/context/cart.context";
import styled from "styled-components";

//@material-ui https://v4.mui.com/
//import IconButton from "@material-ui/core/IconButton";

const CartCircle = styled.div`
position: relative;
`;

const CartCount = styled.div`
  position: absolute;
  top: -7px;
  right: -5px;
  background: rgb(21, 201, 102);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2px;
  font-size: 10px;
`;

interface Props {
  style?: any;
}


/**
 * Cart Icon Button
 */
 const CartTopMenu: React.FC<Props> = (style) => {

  const { t } = useTranslation();
  const { cartItems,
    cartSubTotal,
    setCartItems,
    setCartSubTotal,
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
    {...(style && {
      style: {style}
    })}
  >
    <CartCircle>
      <CartCount>{getCartCount()}</CartCount>
    </CartCircle>
    
    <RiShoppingCart2Fill size={20}/>

  </IconButton>
  );
};

export default CartTopMenu;
