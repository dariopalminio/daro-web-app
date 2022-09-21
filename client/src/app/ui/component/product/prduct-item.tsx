import "./product-item.css";
import { Link } from "react-router-dom";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import { useContext, useState } from "react";
import Button from "../../common/button/button";
import ButtonQuantity from "../../common/button-quantity/button-quantity";

interface Props {
  images?: Array<string>;
  description?: string;
  grossPrice?: number;
  name?: string;
  productId?: string
}
const ProductItem: React.FC<Props> = ({ images, description, grossPrice, name, productId }) => {

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext) as ICartContext;

  const addToCartHandler = () => {
    const item = { id: "3", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name3", price: 4, qty: 3, countInStock: 4, amount: 12 };

    addToCart(item);
    console.log("addToCartHandler");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getImage = () => {
    return images? images[0] : "jpg";
  }

  const getDescription = () => {
    return description? description.substring(0, 100) : "No description!";
  }

  const getPrice = () => {
    return grossPrice? grossPrice : "No price!";
  }

  return (

    <div className="product">
      <img src={getImage()} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{getDescription()}...</p>

        <p className="info__price">${getPrice()}</p>

      </div>

      <Link to={`/catalog/product/detail/${productId}`} className="linkframe">
        See Detail
      </Link>

      <div className="frame_product_buttons">
        <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
        <Button
          onClick={addToCartHandler}>
          Add to Cart
        </Button>
      </div>
      
    </div>
  );
};

export default ProductItem;