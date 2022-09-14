import "./cart-item.css";
import { Link } from "react-router-dom";

// @ts-ignore
const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="cartitem">

      <div className="cartitem__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <Link to={`/catalog/product/detail/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem__price">${item.price}</p>
      
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {item.countInStock}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;