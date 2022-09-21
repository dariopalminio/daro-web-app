import { FunctionComponent, useContext } from "react";
import logo from "../../../image/logo_app.png";
import styled, { useTheme } from "styled-components";
import UserTopMenu from "./user-top-menu";
import CartTopMenu from "./cart-top-menu";
import { RiMenuFill } from "react-icons/ri";
import IconButton from "../../../common/icon-button/icon-button";
import { ILayoutContext, LayoutContext } from "../layout-context-provider";

const LogoImg = styled.img``;

const containerTopMenuStyle = {
  display: "flex",
  flexGrow: 100,
  justifyContent: "flex-end",
};

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
const TopNavBar: FunctionComponent = () => {
  const theme: any = useTheme();
  const { sidebarWidth,
    isSidebarOpen,
    toggleSidebar } = useContext(LayoutContext) as ILayoutContext;

  const Topbar = styled.div`
  position: relative;
  display: flex; 
  background-image: ${theme.colors.BGRDMain};
  height: ${props => props.theme.headerHeight}px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  `
  const TopMenuContainer = styled.div`
  position: relative;
  left: 5px;
  display: flex; 
  align-items: center;
  `

  return (

    <Topbar>
      <TopMenuContainer>
        {!isSidebarOpen &&
          <IconButton onClick={toggleSidebar}>
            <RiMenuFill />
          </IconButton>
        }

        <UserTopMenu />

        <CartTopMenu />
      </TopMenuContainer>
      <div style={containerTopMenuStyle}>
        <LogoImg style={{ width: "34", height: "34", }} src={logo} />
      </div>
    </Topbar>

  );
};

export default TopNavBar;
