import { FunctionComponent, useContext } from "react";
import { useTranslation } from 'react-i18next';
import "./cart.css";

//@material-ui https://v4.mui.com/
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from "@material-ui/core/IconButton";


/**
 * Cart Icon Button
 */
const CartTopMenu: FunctionComponent = () => {
  const { t } = useTranslation();

  const handleViewCart = () => {
    //alert("view cart");
  };

  return (
    <IconButton
    aria-label={t('cart')}
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleViewCart}
    color="inherit"
    href="/cart"
  >
    <div className="cart-circle" >
      <span id="cart_count" data-action="cart-can" className="badge rounded-circle">5</span>
    </div>
    
    <ShoppingCartOutlinedIcon />

  </IconButton>
  );
};

export default CartTopMenu;
