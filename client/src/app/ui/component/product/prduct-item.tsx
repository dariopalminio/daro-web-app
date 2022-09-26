import "./product-item.css";
import { Link } from "react-router-dom";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import { useContext, useState } from "react";
import Button from "../../common/button/button";
import ButtonQuantity from "../../common/button-quantity/button-quantity";
import noImage from "../../image/no_image.png";

interface Props {
  image?: string;
  description?: string;
  grossPrice?: number;
  name?: string;
  productId?: string
}
const ProductItem: React.FC<Props> = ({ image, description, grossPrice, name, productId }) => {

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext) as ICartContext;

  const addToCartHandler = () => {
    const item = { id: "3", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name3", price: 4, qty: 3, countInStock: 4, amount: 12 };

    addToCart(item);////product
    console.log("addToCartHandler");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getImage = () => {
    return image ? image : '';
  }

  const getDescription = () => {
    return description? description.substring(0, 100) : "No description!";
  }

  const getPrice = () => {
    return grossPrice? grossPrice : "No price!";
  }

  return (

    <div className="product">
      <img style={{position: "relative", margin: "2px", width: "100%"}} src={getImage()} alt={name} />
     


      <div className="product_info">
        <p className="info_name">{name}</p>

        <p className="info_description">{getDescription()}...</p>

        <p className="info_price">${getPrice()}</p>

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