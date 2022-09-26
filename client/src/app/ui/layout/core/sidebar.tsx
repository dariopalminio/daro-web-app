import MenuList from "../../common/menu-list/menu-list";
import { MenuItemType } from "../../common/menu-list/menu-item.type";
import { useContext } from "react";
import SessionContext, { ISessionContext } from "../../../../domain/context/session.context";
import styled from "styled-components";


//Styled-components
const SideBarInner = styled.div`
        width: 100%;
        height: 100%;
        margin: 0px;
        background: #F9F9F9;
`;

interface Props {
    menuList: MenuItemType[];
    style?: any;
}

/**
 * Patterns: Compound Components, Context Provider and Extensible Styles
 */
const SideBar: React.FC<Props> = ({ menuList, style }) => {
    const { permission } = useContext(SessionContext) as ISessionContext;
    
    return (
        <SideBarInner style={style ? style: { }}>
            <MenuList permission={permission} menuList={menuList}></MenuList>
        </SideBarInner>
    );
};

export default SideBar;