import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useCatalog from "../../../../domain/hook/products/catalog.hook";
import { CenteringContainer } from "../../common/elements/centering-container";

 const CategoriesWrapper = styled.div`
    display: block;
    width: 100%;
    margin: 0px 0px 15px 0px;
    height: 3em;
    border: none;
    padding: 5px 5px 5px 5px;
`;

 const CategoryLink = styled.a`
    padding: 5px 5px 5px 5px;
`;

interface Props {
    categorySelected: string;
    categories: string[];
    placeholder?: string;
    onClick: (cat: string) => void;
}


/**
 * Paper for container
 * Stateless components, extensible Style and controlled component
 */
const Categories: React.FC<Props> = ({categorySelected, categories, onClick }) => {
    const { t } = useTranslation();

      
    const getLinkColor = (el: string) => {
        if (el===categorySelected) return 'red';
        return 'blue';
      }

    return (
        <CategoriesWrapper>
            <CenteringContainer>

            {categories.map((element: string, index: number) => {
                    return (
                        <>
                           <CategoryLink href="#" style={{color: getLinkColor(element)}} onClick={()=>onClick(element)}>{element}</CategoryLink>
                        </>
                    )
                }
                )}
            </CenteringContainer>
        </CategoriesWrapper>
    );
};

export default Categories;