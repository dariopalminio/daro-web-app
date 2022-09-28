import "./product-detail.css";
import { useState, useEffect, useContext } from "react";
import Button from "../../common/button/button";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import CarouselImg from "../../common/img-carousel/img-carouse";
import useProducts from "../../../../domain/hook/products/products.hook";
import ButtonQuantity from "../../common/button-quantity/button-quantity";
import { useTranslation } from "react-i18next";
import SingleAttrTable from "../../common/table/single-att-table";
import { CenteringContainer } from "../../common/elements/centering-container";
import { ProductType } from "../../../../domain/model/product/product.type";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
// Actions


interface Props {
  product: ProductType | null;
}

/**
 * Product Item
 * 
 */
const ProductDetail: React.FC<Props> = ({ product }) => {

  const { t } = useTranslation();
  const [qty, setQty] = useState(1);
  const { cartItems,
    cartSubTotal,
    setCartItems,
    setCartSubTotal,
    addToCart,
    removeFromCart,
    getCartCount,
    changeItemQuantity } = useContext(CartContext) as ICartContext;
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    console.log("addToCartHandler-->cartItems", cartItems);
    if (product && qty > 0) addToCart(product, qty);
    else console.log("No tiene producto que agregar!");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getAttributes = () => {
    if (product) {
      const attrs: Array<{ label: string, value: string }> = [
        { label: 'Category', value: product.category },
        { label: 'Type', value: product.type },
        { label: 'Brand', value: product.brand },
        { label: 'Color', value: product.color },
        { label: 'Size', value: product.size },
        { label: 'Gender', value: product.gender },
        { label: 'sku', value: product.sku }
      ]
      return attrs;
    }
    return [];
  };


  return (
    <div className="product_detail_container">
      <>
        {product && (
          <>
            <div className="product_detail">
              <div className="frame_image">
                <p className="product_name">{product.name}</p>
                <CarouselImg uniqueId={product._id} images={product.images} width={"100%"} height={"300px"}></CarouselImg>
                <p>{product.description}</p>
              </div>
              <div className="prod_info">
                <p>{t('cart.price')}: ${product.grossPrice}</p>

                <div style={{ marginBottom: "10px" }}>Características principales:</div>

                <SingleAttrTable rowDictionary={getAttributes()} />
                <div className="call_to_action">
                  <div className="call_to_action_info">
                    <p>
                      {t('cart.price')}:
                      <span>${product.grossPrice}</span>
                    </p>
                    <p>
                      {t('cart.detail.state')}:
                      <span>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </p>

                    <CenteringContainer>
                      <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
                    </CenteringContainer>

                    <p>
                      <Button onClick={addToCartHandler}>
                        {t('cart.button.add.to.cart')}
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </>
        )}
      </>

      {!product && <Alert severity="error">No se ha podido cargar producto!</Alert>}

    </div>
  );
};

export default ProductDetail;