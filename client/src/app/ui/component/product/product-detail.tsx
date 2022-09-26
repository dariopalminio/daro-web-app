import "./product-detail.css";
import { useState, useEffect, useContext } from "react";
import Button from "../../common/button/button";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';
import CarouselImg from "../../common/img-carousel/img-carouse";
import useProducts from "../../../../domain/hook/products/products.hook";
import ButtonQuantity from "../../common/button-quantity/button-quantity";
// Actions


// @ts-ignore
const ProductDetail = ({ product }) => {
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
          <div className="productscreen__left">
            <div className="left__image">
            <CarouselImg uniqueId={product._id} images={product.images} width={"100%"} height={"300px"}></CarouselImg>
              
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Precio: ${product.grossPrice}</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Precio:
                <span>${product.grossPrice}</span>
              </p>
              <p>
                Estado:
                <span>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
              <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />

              </p>
              <p>

                <Button
                  onClick={addToCartHandler}>
                  Add to Cart
                </Button>


              </p>
            </div>
          </div>
        </>

    </div>
  );
};

export default ProductDetail;