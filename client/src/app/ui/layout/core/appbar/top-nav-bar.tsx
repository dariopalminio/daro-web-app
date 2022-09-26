import { FunctionComponent, useContext } from "react";
import logo from "../../../image/logo_app.png";
import styled, { useTheme } from "styled-components";
import UserTopMenu from "./user-top-menu";
import CartTopMenu from "./cart-top-menu";
import { RiMenuFill } from "react-icons/ri";
import IconButton from "../../../common/icon-button/icon-button";
import { ILayoutContext, LayoutContext } from "../layout-context-provider";
import MenuIconButton from "../../../common/menu-icon-button/menu-icon-button";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import { MenuItemType } from "../../../common/menu-list/menu-item.type";

const LogoImg = styled.img``;

const containerTopMenuStyle = {
  display: "flex",
  flexGrow: 100,
  marginLeft: "6px",
  justifyContent: "flex-start",
};

interface Props {
  menuList: MenuItemType[];
  style?: any;
}

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
 const TopNavBar: React.FC<Props> = ({ menuList, style }) => {
  const theme: any = useTheme();
  const { sidebarWidth,
    isSidebarOpen,
    toggleSidebar } = useContext(LayoutContext) as ILayoutContext;
    const { permission } = useContext(SessionContext) as ISessionContext;
    
  const Topbar = styled.div`
  position: relative;
  display: flex; 
  align-items: center;
  background-image: ${theme.colors.BGRDMain};
  height: ${props => props.theme.headerHeight}px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  `
  const TopMenuContainer = styled.div`
  position: relative;
  width: 100%;
  right: 30px;
  margin-right: 30px;
  left: 5px;
  display: flex; 
  align-items: center;
  justify-content: right;
  `

  return (

    <Topbar>
      {!isSidebarOpen &&
          <IconButton onClick={toggleSidebar} style={{ justifySelf: "left", marginLeft: "5px"}}>
            <RiMenuFill  size={24}/>
          </IconButton>
        }

<div style={containerTopMenuStyle}>
        <LogoImg style={{ width: "34", height: "34", marginRight: "10px"}} src={logo} />
      </div>

      <TopMenuContainer>

        <MenuIconButton permission={permission} menuList={menuList} />

        <CartTopMenu />

      </TopMenuContainer>

    </Topbar>

  );
};

export default TopNavBar;
