import "./cart-item.css";
import { Link } from "react-router-dom";

//https://v4.mui.com/
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import QuantityBtn from "./quantity-btn";



const CartItem = ({ item, qtyChangeHandler, removeHandler }: any) => {


  const handlerNewQuantityValue = (newQuantityValue: number) => {
    //validate item.countInStock
    qtyChangeHandler(item.id, newQuantityValue);
  };

  return (
    <div className="cartitem">

      <div className="cartitem__image">
        <img src={item.imageUrl} alt={item.name} width="100px" height="100px"/>
      </div>

      <Link to={`/catalog/product/detail/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem__price">${item.price}</p>

      
      <QuantityBtn value={item.qty} onChange={(newQuantityValue:number) => handlerNewQuantityValue(newQuantityValue)} />

      <p className="cartitem__price">${item.amount}</p>

      <IconButton size="small" edge="end" aria-label="delete" onClick={() => removeHandler(item.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;