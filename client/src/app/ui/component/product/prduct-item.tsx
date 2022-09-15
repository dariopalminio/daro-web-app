import "./product-item.css";
import { Link } from "react-router-dom";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import { useContext } from "react";
import { Button } from "@material-ui/core";
import QuantityBtn from "../cart/quantity-btn";

// @ts-ignore
const ProductItem = ({ imageUrl, description, price, name, productId }) => {

  const { cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
    addToCart,
    removeFromCart,
    getCartCount,
    changeItemQuantity } = useContext(CartContext) as ICartContext;

  const addToCartHandler = () => {
    const item = { id: "3", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name3", price: 4, qty: 3, countInStock: 4, amount: 12 };

    console.log("addToCartHandler-->cartItems", cartItems);
    addToCart(item);
    console.log("addToCartHandler");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    //validate item.countInStock

  };

  return (

    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

      </div>

      <Link to={`/catalog/product/detail/${productId}`} className="linkframe">
        See Detail
      </Link>
      <div className="frame_product_buttons">
        <QuantityBtn value={1} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
        <Button className='gradient-button-salmon'
          onClick={addToCartHandler}>
          Add to Cart
        </Button>
      </div>
    </div>


  );
};

export default ProductItem;