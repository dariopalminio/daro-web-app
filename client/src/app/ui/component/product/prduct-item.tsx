import "./product-item.css";
import { Link } from "react-router-dom";

// @ts-ignore
const ProductItem = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Link to={`/catalog/product/detail/${productId}`} className="info__button">
          Ver
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;