import Button from "app/ui/common/button/button";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const CartSummary = styled.div`
    flex: 0.3;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    height: fit-content;
    border-radius: 5px;
    div {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
    }
    div:last-child {
        border: none;
    }
    div button {
        padding: 10px 17px;
        width: 100%;
    }
    div button:hover {
        opacity: 0.9;
    }
    @media (max-width: 960px) {
          margin: 1rem;
      }
    .shopping_cart_info p {
        padding: 8px;
      }
      
    .shopping_cart_info p:first-child {
        font-weight: bold;
      }
`;

const CartContainer = styled.div`
    display: flex;
    max-width: 1300px;
    margin: 2rem auto;
    background: transparent;
    h2 {
        margin-bottom: 1rem;
    }
    @media (max-width: 1320px) {
        max-width: 900px;
    }
    @media (max-width: 960px) {
        max-width: 800px;
    }
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const CartList = styled.div`
    flex: 0.7;
    margin-right: 1rem;
    background: transparent;
    padding: 1rem;
    border-radius: 5px;
`;

const ListHeader = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
    gap: 1px;
    text-align: left;
    border-radius: 5px;
    align-items: start;
    margin-bottom: 5px;
    p {
        text-align: left;
        margin-left:5px;
    }
`;

interface Props {
    empty: boolean;
    count: number;
    subtotal: number;
    onClick: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * Cart
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const Cart: React.FC<Props> = ({ empty, count, subtotal, onClick, children }) => {
    const { t } = useTranslation();

    return (
        <CartContainer>
            
            <CartList>
                <h1>{t('cart.title.shoppingcart')}</h1>

                {empty ? (
                    <div>
                        {t('cart.empty')}
                    </div>
                ) : (
                    <div>
                        <ListHeader>
                            <p/>
                            <p>{t('cart.product')}</p>
                            <p>{t('cart.price')}</p>
                            <p>{t('cart.quantity')}</p>
                            <p style={{textAlign: "right"}}>{t('cart.amount')}</p>
                            <p></p>
                        </ListHeader>
                        {children}
                    </div>
                )}
            </CartList>

            <CartSummary>
                <div className="shopping_cart_info">
                    <p>{t('cart.you.have')} ({count}) {t('cart.products')}</p>
                    <p>{t('cart.subtotal')}: ${subtotal}</p>
                </div>
                <div>
                    <Button
                        onClick={onClick}>
                        {t('cart.button.checkout')}
                    </Button>
                </div>
            </CartSummary>
        </CartContainer >
    );
};

export default Cart;