import React, { FunctionComponent, useContext } from "react"
import { Link } from "react-router-dom"
import { atom, useAtom } from "jotai"
import UserContext, { UserContextType } from "../../context/UserContext"
import styled from "styled-components"
import Sidebar from "./sidebar/Sidebar"
import "./Navbar.css"

import logo from "../../images/logo_app.png"
import { IconContext } from "react-icons" //https://react-icons.github.io/react-icons/
import { AiOutlineMenu as SidebarIcon } from "react-icons/ai" //https://react-icons.github.io/react-icons/
import { BiUserCircle as LoggedUserIcon } from "react-icons/bi"
import { AiOutlineShopping as ShoppingCartIcon} from "react-icons/ai"
import { BiUserX as NoUserIcon } from "react-icons/bi"

const Nav = styled.div``;
const NavIconLink = styled(Link)``;
const LogoImg = styled.img``;
const NavLogo = styled.div``;

const NavIconLinkLeftStyle: React.CSSProperties = {
  justifyContent: "flex-start",
  marginLeft: "1rem",
};

const NavIconLinkRightStyle: React.CSSProperties = {
  justifyContent: "flex-end",
  marginRight: "1rem",
};

export const sidebarLeftStatus = atom(false);

const Navbar: FunctionComponent = () => {
  const { isLogged } = useContext(UserContext) as UserContextType;
  const [sidebarLeftIsShown, setSidebarIsShown] = useAtom(sidebarLeftStatus);

  const showSidebar = () => setSidebarIsShown(!sidebarLeftIsShown);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav className="Navbar">
        <NavIconLink
          className="NavIconLink"
          style={NavIconLinkLeftStyle}
          to="#"
          onClick={showSidebar}
        >
          <SidebarIcon />
        </NavIconLink>

        <NavLogo className="NavLogo">
          <LogoImg className="Logo" src={logo} />
        </NavLogo>

        <div className="RightNavWrap" style={NavIconLinkRightStyle}>
          <NavIconLink className="NavIconLink" to="/user/login">
            {isLogged && <LoggedUserIcon />}
            {!isLogged && <NoUserIcon />}
          </NavIconLink>
          <NavIconLink className="NavIconLink" to="/cart">
            <ShoppingCartIcon />
          </NavIconLink>
        </div>
      </Nav>
      <Sidebar />
    </IconContext.Provider>
  );
};

export default Navbar;
