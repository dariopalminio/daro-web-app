
import { Link } from "react-router-dom";
import ButtonQuantity from "app/ui/common/button-quantity/button-quantity";
import { CartItemType } from "domain/model/cart/cart-item.type";
import styled from "styled-components";
import { RiDeleteBin7Fill } from "react-icons/ri";
import IconButton from "app/ui/common/icon-button/icon-button";

const CartItemWrapper = styled.div`
    width: 100%;
    padding: 1rem;
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "a b c d e f";
    gap: 8px;
    background: #fff;
    border-radius: 2px;
    margin-bottom: 8px;
    .cartitem_image {
      grid-area: a;
    }
    .cartItem_name {
      grid-area: b;
      text-decoration: none;
      color: black;
    }
    .cartItem_name:hover {
      color: #3da1e4;
    }
    .cartitem_price {
      grid-area: c;
    }
    .cartitem_qty {
      grid-area: d;
    }
    .cartitem_amount {
      grid-area: e;
    }
    .cartitem_delete {
      grid-area: f;
      padding-top: 5px;
    }
    @media (max-width: 700px) {
      .cartItem_name {
      font-size: 0.8rem;
      }
      .cartitem_price {
      font-size: 0.8rem;
      }
    }
  
    @media (max-width: 700px) {
      .cartItem_name {
      font-size: 0.6rem;
      }
      .cartitem_price {
      font-size: 0.6rem;
      }
    }
`;

interface Props {
  item: CartItemType;
  qtyChangeHandler: (id: string, qty: number) => void;
  removeHandler: (id: string) => void;
}

/**
 * CartItem
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const CartItem: React.FC<Props> = ({ item, qtyChangeHandler, removeHandler }) => {


  const handlerNewQuantityValue = (newQuantityValue: number) => {
    //validate item.countInStock
    qtyChangeHandler(item.itemId, newQuantityValue);
  };

  return (
    <CartItemWrapper>

      <div className="cartitem_image">
        <img src={item.imageUrl} alt={item.name} width="100px" height="100px" />
      </div>

      <Link to={`/catalog/product/detail/${item.productId}`} className="cartItem_name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem_price">${item.grossPrice}</p>

      <div className="cartitem_qty">
        <ButtonQuantity value={item.qty} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
      </div>
      <p className="cartitem_amount">${item.amount}</p>
      <div className="cartitem_delete">
        <IconButton
          onClick={() => removeHandler(item.itemId)}>
          <RiDeleteBin7Fill size={20} color="grey" onClick={() => removeHandler(item.itemId)} />
        </IconButton>
      </div>
    </CartItemWrapper>
  );
};

export default CartItem;