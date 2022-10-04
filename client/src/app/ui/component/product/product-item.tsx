import { Link } from "react-router-dom";
import CartContext, { ICartContext } from 'domain/context/cart.context';
import { useContext, useState } from "react";
import Button from "app/ui/common/button/button";
import ButtonQuantity from "app/ui/common/button-quantity/button-quantity";
import { useTranslation } from "react-i18next";
import { ProductType } from "domain/model/product/product.type";
import NoImage from "app/ui/image/no_image.png";
import styled from "styled-components";

//box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

const ProductItemWrapper = styled.div`
  width: 400px;
  padding: 1rem;
  background: #fff;
  cursor: pointer;
  margin: 4px 4px 4px 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius:3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  .linkframe:link { text-decoration: none; }
  .linkframe:visited { text-decoration: none; }
  .linkframe:hover { text-decoration: none; }
  .linkframe:active { text-decoration: none; }
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  @media (max-width: 1232px) {
      width: 360px;
  }
  @media (max-width: 1115px) {
      width: 330px;
  }
  @media (max-width: 1028px) {
      width: 300px;
  }
  @media (max-width: 950px) {
      width: 400px;
  }
  @media (max-width: 830px) {
      width: 330px;
  }
  @media (max-width: 700px) {
      width: 290px;
  }
  @media (max-width: 630px) {
      width: 90%;
  }
  @media (max-width: 500px) {
      width: 90%;
  }
  @media (max-width: 400px) {
      width: 100%;
  }
  .product_info > p {
    margin-bottom: 16px;
  }
  .info_price {
    font-weight: bold;
    color:rgb(5, 5, 5)
  }
  .info_name {
    font-size: 1rem;
    margin-top: 10px;
    color:rgb(5, 5, 5)
  }
  .info_description {
    font-size: 0.8rem;
    color:rgba(16, 17, 16, 0.678)
  }
`;

const ProductItemImg = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
  border-radius: 6px;
`;

const BottomCallToAction = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
 `;

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
    return productItem.images ? productItem.images[0] : NoImage;
  }

  const getDescription = () => {
    return productItem.description ? productItem.description.substring(0, 100) : "No description!";
  }

  const getPrice = () => {
    return productItem.grossPrice ? productItem.grossPrice : "No price!";
  }

  return (
    <ProductItemWrapper>

      <Link to={`/catalog/product/detail/${productItem._id}`} className="linkframe">
        <ProductItemImg style={{ position: "relative", margin: "2px", width: "100%" }} src={getImage()} alt={productItem.name} loading="lazy"/>
      </Link>

      <Link to={`/catalog/product/detail/${productItem._id}`} className="linkframe">
        <div className="product_info">
          <p className="info_name">{productItem.name}</p>

          <p className="info_description">{getDescription()}...</p>

          <p className="info_price">${getPrice()}</p>

        </div>
      </Link>

      <BottomCallToAction>
        <ButtonQuantity
          value={quantity}
          onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
        <Button
          onClick={addToCartHandler}>
          {t('cart.button.add.to.cart')}
        </Button>
      </BottomCallToAction>

    </ProductItemWrapper>

  );
};

export default ProductItem;