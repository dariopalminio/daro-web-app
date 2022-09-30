import { FunctionComponent, useContext } from "react";
import logo from "../../../../image/logo_app.png";
import styled, { useTheme } from "styled-components";
import CartTopMenu from "./cart-top-menu";
import { RiMenuFill } from "react-icons/ri";
import IconButton from "../../../../common/icon-button/icon-button";
import { ILayoutContext, LayoutContext } from "../../../../provider/layout-context-provider";
import MenuIconButton from "../../../../common/menu-icon-button/menu-icon-button";
import SessionContext, { ISessionContext } from "../../../../../../domain/context/session.context";
import { MenuItemType, AccessType } from "../../../../common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiAccountCircleFill, RiHome2Fill, RiShoppingCart2Fill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill} from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Topbar = styled.div`
  position: relative;
  display: flex; 
  align-items: center;
  background-image: ${props => props.theme.layout.headerBackgroundImage};
  height: ${props => props.theme.layout.headerHeight}px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const TopMenuContainer = styled.div`
  position: relative;
  width: 100%;
  right: 30px;
  margin-right: 30px;
  left: 5px;
  display: flex; 
  align-items: center;
  justify-content: right;
`;

const LogoImg = styled.img``;

const containerTopMenuStyle = {
  display: "flex",
  flexGrow: 100,
  marginLeft: "6px",
  justifyContent: "flex-start",
};

interface Props {
  menuList?: MenuItemType[];
  style?: any;
}

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
 const TopNavBar: React.FC<Props> = ({ menuList, style }) => {
  const { t } = useTranslation();
  const theme: any = useTheme();
  const { sidebarWidth,
    isSidebarOpen,
    toggleSidebar } = useContext(LayoutContext) as ILayoutContext;
    const { permission } = useContext(SessionContext) as ISessionContext;

   const SubMenuUser: MenuItemType[] = [
    {
      key: "1",
      title: t("menu.login"),
      path: "/user/auth",
      icon: <RiShieldUserFill />,
      access: [AccessType.ANONYMOUS],
      divider: false,
      submenu: null
    },
    {
      key: "1",
      title: t("menu.logout"),
      path: "/user/auth",
      icon: <RiShieldUserFill />,
      access: [AccessType.USER, AccessType.ADMIN],
      divider: false,
      submenu: null
    },
    {
      key: "2",
      title: t("menu.register"),
      path: "/user/register/form",
      icon: <RiUserAddFill />,
      access: [AccessType.ANONYMOUS],
      divider: false,
      submenu: null
    },
    {
      key: "3",
      title: t("menu.profile"),
      path: "/user/profile",
      icon: <RiUserSearchFill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      divider: false,
      submenu: null
    },
  ];
  
   const TopMenuData: MenuItemType[] = [
    {
      key: "1",
      title: t("menu.user"),
      path: "/",
      icon: <RiAccountCircleFill size={24} />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      divider: false,
      submenu: SubMenuUser
    },
  ];

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

        <MenuIconButton permission={permission} menuList={TopMenuData} />

        <CartTopMenu />

      </TopMenuContainer>

    </Topbar>

  );
};

export default TopNavBar;
