import "./product-detail.css";
import { useState, useEffect } from "react";


// Actions


// @ts-ignore
const ProductDetail = ({id}) => {
  const [qty, setQty] = useState(1);


  //const productDetails = useSelector((state) => state.getProductDetails);
  const productDetails = {loading:false, error:false, product:{name: "name", imageUrl:"img", price:0,description:"description", countInStock:1}};
  const { loading, error, product } = productDetails;


  const addToCartHandler = () => {
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
                <button type="button" onClick={addToCartHandler}>
                  Agregar a carrito
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;