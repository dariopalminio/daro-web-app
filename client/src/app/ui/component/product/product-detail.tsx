import "./product-detail.css";
import { useState, useEffect, useContext } from "react";
import Button from "../../common/button/button";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import CarouselImg from "../../common/img-carousel/img-carouse";
import useProducts from "../../../../domain/hook/products/products.hook";
import ButtonQuantity from "../../common/button-quantity/button-quantity";
import { useTranslation } from "react-i18next";
// Actions


// @ts-ignore
const ProductDetail = ({ product }) => {
  const { t } = useTranslation();
  const [qty, setQty] = useState(1);
  const { cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
    addToCart,
    removeFromCart,
    getCartCount,
    changeItemQuantity } = useContext(CartContext) as ICartContext;
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    const item = { id: "3", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name3", price: 4, qty: 3, countInStock: 4, amount: 12 };

    console.log("addToCartHandler-->cartItems", cartItems);
    addToCart(item); //product
    console.log("addToCartHandler");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  return (
    <div className="productscreen">
      <>
        <div className="productscreen_left">
          <div className="left_image">
            <CarouselImg uniqueId={product._id} images={product.images} width={"100%"} height={"300px"}></CarouselImg>

          </div>
          <div className="left_info">
            <p className="left_name">{product.name}</p>
            <p>{t('cart.price')}: ${product.grossPrice}</p>
            <p>{product.description}</p>
            <p>detalle 2</p>
          </div>
        </div>

        <div className="productscreen_right">
          <div className="right_info">
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
            <p>
              <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />

            </p>
            <p>

              <Button onClick={addToCartHandler}>
                {t('cart.button.add.to.cart')}
              </Button>


            </p>
          </div>
        </div>
      </>

    </div>
  );
};

export default ProductDetail;