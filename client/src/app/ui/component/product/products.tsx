import ProductItem from "./product-item";
import { ProductType } from "domain/model/product/product.type";
import styled from "styled-components";

export const CatalogContainer = styled.div`
    margin: 0 auto;
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 1232px) {
        grid-template-columns: repeat(3, auto);
    }
    @media (max-width: 950px) {
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 630px) {
        grid-template-columns: 1fr;
    }
`;

interface Props {
    productList: Array<ProductType>;
}

/**
 * Customized IconButton
 */
const Products: React.FC<Props> = ({ productList }) => {


    return (
        <CatalogContainer>
            <ProductsContainer>
                {
                    productList.map((product: any) => (
                        <ProductItem
                            productItem={product}
                        />
                    ))
                }
            </ProductsContainer>
        </CatalogContainer>
    )
}

export default Products;