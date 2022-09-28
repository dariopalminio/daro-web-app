import "./cart-item.css";
import { Link } from "react-router-dom";
import ButtonQuantity from "../../common/button-quantity/button-quantity";

//https://v4.mui.com/
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Cart from "./cart";
import { CartItemType } from "../../../../domain/model/cart/cart-item.type";


interface Props {
  item: CartItemType;
  qtyChangeHandler: (id: string, qty: number) => void;
  removeHandler: (id: string) => void;
}

/**
 * CartItem
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
 const CartItem: React.FC<Props> = ({ item, qtyChangeHandler, removeHandler}) => {


  const handlerNewQuantityValue = (newQuantityValue: number) => {
    //validate item.countInStock
    qtyChangeHandler(item.id, newQuantityValue);
  };

  return (
    <div className="cartitem">

      <div className="cartitem_image">
        <img src={item.imageUrl} alt={item.name} width="100px" height="100px"/>
      </div>

      <Link to={`/catalog/product/detail/${item.id}`} className="cartItem_name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem_price">${item.grossPrice}</p>

      <ButtonQuantity value={item.qty} onChange={(newQuantityValue:number) => handlerNewQuantityValue(newQuantityValue)} />

      <p className="cartitem_price">${item.amount}</p>

      <IconButton size="small" edge="end" aria-label="delete" onClick={() => removeHandler(item.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;