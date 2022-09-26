import "./cart.css";
import { Link } from "react-router-dom";
import ButtonQuantity from "../../common/button-quantity/button-quantity";

//https://v4.mui.com/
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "../../common/button/button";


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

  return (
    <div className="cartscreen">
    <div className="cartscreen__left">
        <h2>Shopping Cart</h2>

        {empty ? (
            <div>
                Tu carrito esta vacio <Link to="/">Volver a página principal</Link>
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
                {children}
            </div>
        )}
    </div>

    <div className="cartscreen__right">
        <div className="cartscreen__info">
            <p>Subtotal ({count}) Productos</p>
            <p>${subtotal}</p>
        </div>
        <div>
            <Button 
                 onClick={onClick}>
                Continue
            </Button>
        </div>
    </div>
</div>
  );
};

export default Cart;