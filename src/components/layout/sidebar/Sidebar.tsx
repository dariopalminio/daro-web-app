import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AiOutlineClose as SidebarCloseIcon } from "react-icons/ai" //https://react-icons.github.io/react-icons/
import { SidebarMenuData } from "./SidebarMenuData"
import Submenu from "./Submenu"
//import { BiWrench, BiListPlus, BiListUl, BiGridAlt } from "react-icons/bi"; //https://react-icons.github.io/react-icons/
import { useAtom } from "jotai"
import { sidebarLeftStatus } from "../Navbar"
import "./Sidebar.css"

const NavIconLink = styled(Link)``
const SidebarLeftNav = styled.div``
const SidebarNavWrap = styled.div``

const Sidebar: FunctionComponent = () => {
  const [sidebarLeftIsShown, setSidebarIsShown] = useAtom(sidebarLeftStatus);

  const hideSidebar = () => {
    setSidebarIsShown(false)
  };

  return (
    <SidebarLeftNav
      className="SidebarLeftNav"
      style={{ left: sidebarLeftIsShown ? "0" : "-100%" }}
    >
      <SidebarNavWrap>
        <NavIconLink className="NavIconLink" to="#" onClick={hideSidebar}>
          <SidebarCloseIcon />
        </NavIconLink>
        {SidebarMenuData.map((item, index) => {
          return <Submenu item={item} key={index} />
        })}
      </SidebarNavWrap>
    </SidebarLeftNav>
  );
};

export default Sidebar
