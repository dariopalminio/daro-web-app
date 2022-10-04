import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CenteringContainer } from "app/ui/common/elements/centering-container";
import { CategoryType } from "domain/model/category/category.type";

 const CategoriesWrapper = styled.div`
    display: block;

    margin: 0px 0px 15px 0px;
    height: 3em;
    border: none;
    padding: 5px 5px 5px 5px;
`;

 const CategoryLink = styled.a`
    padding: 5px 5px 5px 5px;
`;

interface Props {
    categorySelected: CategoryType|null;
    categories: CategoryType[];
    placeholder?: string;
    onClick: (cat: CategoryType) => void;
}


/**
 * Paper for container
 * Stateless components, extensible Style and controlled component
 */
const Categories: React.FC<Props> = ({categorySelected, categories, onClick }) => {
    const { t } = useTranslation();

      
    const getLinkColor = (el: CategoryType) => {
        if (el.name===categorySelected?.name) return 'red';
        return 'blue';
      }

    return (
        <CategoriesWrapper>
            <CenteringContainer>

            {categories.map((element: CategoryType, index: number) => {
                    return (
                        <>
                           <CategoryLink href="#" style={{color: getLinkColor(element)}} onClick={()=>onClick(element)}>{element.name}</CategoryLink>
                        </>
                    )
                }
                )}
            </CenteringContainer>
        </CategoriesWrapper>
    );
};

export default Categories;