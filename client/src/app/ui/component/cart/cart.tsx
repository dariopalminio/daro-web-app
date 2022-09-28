import "./cart.css";
import { Link } from "react-router-dom";
import ButtonQuantity from "../../common/button-quantity/button-quantity";

//https://v4.mui.com/
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "../../common/button/button";
import { useTranslation } from "react-i18next";


interface Props {
    empty: boolean;
    count: number;
    subtotal: number;
    onClick: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * Cart
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
 const Cart: React.FC<Props> = ({ empty, count, subtotal, onClick, children }) => {
    const { t } = useTranslation();
    
  return (
    <div className="cartscreen">
    <div className="cartscreen_left">
        <h1>{t('cart.title.shoppingcart')}</h1>

        {empty ? (
            <div>
                Tu carrito esta vacio.
            </div>
        ) : (
            <div>
                <div className="cartitems_header">
                    <p ></p>
                    <p >{t('cart.name')}</p>
                    <p >{t('cart.price')}</p>
                    <p >{t('cart.quantity')}</p>
                    <p >{t('cart.amount')}</p>
                    <p ></p>
                </div>
                {children}
            </div>
        )}
    </div>

    <div className="cartscreen_right">
        <div className="cartscreen_info">
            <p>{t('cart.you.have')} ({count}) {t('cart.products')}</p>
            <p>{t('cart.subtotal')}: ${subtotal}</p>
        </div>
        <div>
            <Button 
                 onClick={onClick}>
                {t('cart.button.checkout')}
            </Button>
        </div>
    </div>
</div>
  );
};

export default Cart;