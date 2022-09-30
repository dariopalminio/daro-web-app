import MenuList from "../../../common/menu-list/menu-list";
import { useContext } from "react";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import styled from "styled-components";
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiFunctionFill } from "react-icons/ri";
import { RiMailSendFill} from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { AccessType, MenuItemType } from "../../../common/menu-list/menu-item.type";

//Styled-components
const SideBarInner = styled.div`
        width: 100%;
        height: 100%;
        margin: 0px;
        background: #F9F9F9;
`;

interface Props {
    menuList?: MenuItemType[];
    style?: any;
}

/**
 * Patterns: Compound Components, Context Provider and Extensible Styles
 */
const SideBar: React.FC<Props> = ({ menuList, style }) => {
    const { permission } = useContext(SessionContext) as ISessionContext;
    const { t } = useTranslation();

    const LeftMenuData: MenuItemType[] = [
        {
          key: "1",
          title: t("menu.home"),
          path: "/",
          icon: <RiHome2Fill />,
          access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
          divider: false,
          submenu: null
        },
        {
          key: "2",
          title: t("menu.my.cart"),
          path: "/cart",
          icon: <RiShoppingCart2Fill />,
          access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
          divider: false,
          submenu: null
        },
        {
          key: "3",
          title: t("menu.catalog"),
          path: "/catalog",
          icon: <RiFunctionFill />,
          access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
          divider: false,
          submenu: null
        },
        {
          key: "4",
          title: t("menu.contact"),
          path: "/contact",
          icon: <RiMailSendFill />,
          access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
          divider: false,
          submenu: null
        }
      ];

    return (
        <SideBarInner style={style ? style: { }}>
            <MenuList permission={permission} menuList={LeftMenuData}></MenuList>
        </SideBarInner>
    );
};

export default SideBar;