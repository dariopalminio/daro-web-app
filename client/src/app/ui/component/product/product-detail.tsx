import "./product-detail.css";
import { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import CartContext, { ICartContext } from '../../../../domain/context/cart.context';

// Actions


// @ts-ignore
const ProductDetail = ({ id }) => {
  const [qty, setQty] = useState(1);
  const { cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
    addToCart,
    removeFromCart,
    getCartCount,
    changeItemQuantity } = useContext(CartContext) as ICartContext;

  //const productDetails = useSelector((state) => state.getProductDetails);
  const productDetails = { loading: false, error: false, product: { name: "name", imageUrl: "img", price: 0, description: "description", countInStock: 1 } };
  const { loading, error, product } = productDetails;


  const addToCartHandler = () => {
    const item = { id: "3", imageUrl: "https://www.criollitos.com/wp-content/uploads/2020/01/manzanaVerde-600x600.jpg", name: "Product Name3", price: 4, qty: 3, countInStock: 4, amount: 12 };

    console.log("addToCartHandler-->cartItems", cartItems);
    addToCart(item);
    console.log("addToCartHandler");
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Descripcion: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Precio:
                <span>${product.price}</span>
              </p>
              <p>
                Estado:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Cantidad

              </p>
              <p>

                <Button className='gradient-button-salmon'
                  onClick={addToCartHandler}>
                  Add to Cart
                </Button>


              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;