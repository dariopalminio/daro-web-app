import "./product-item.css";
import { Link } from "react-router-dom";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import { useContext, useState } from "react";
import Button from "../../common/button/button";
import ButtonQuantity from "../../common/button-quantity/button-quantity";
import { useTranslation } from "react-i18next";
import { ProductType } from "../../../../domain/model/product/product.type";

interface Props {
  productItem: ProductType;
}

/**
 * Product Item
 * 
 */
const ProductItem: React.FC<Props> = ({ productItem }) => {

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext) as ICartContext;
  const { t } = useTranslation();

  const addToCartHandler = () => {
    if (productItem && quantity > 0) addToCart(productItem, quantity);
    else console.log("No tiene prodiuctos que agregar!");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getImage = () => {
    return productItem.images ? productItem.images[0] : undefined;
  }

  const getDescription = () => {
    return productItem.description ? productItem.description.substring(0, 100) : "No description!";
  }

  const getPrice = () => {
    return productItem.grossPrice ? productItem.grossPrice : "No price!";
  }

  return (

    <div className="product">
      <img style={{ position: "relative", margin: "2px", width: "100%" }} src={getImage()} alt={productItem.name} />

      <div className="product_info">
        <p className="info_name">{productItem.name}</p>

        <p className="info_description">{getDescription()}...</p>

        <p className="info_price">${getPrice()}</p>

      </div>

      <Link to={`/catalog/product/detail/${productItem._id}`} className="linkframe">
        See Detail
      </Link>

      <div className="frame_product_buttons">
        <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
        <Button
          onClick={addToCartHandler}>
          {t('cart.button.add.to.cart')}
        </Button>
      </div>

    </div>
  );
};

export default ProductItem;