import { MenuItemType } from "../../common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiFunctionFill } from "react-icons/ri";
import { RiMailSendFill} from "react-icons/ri";

/**
 * Data of Menu List for Left Nav Bar
 */
export const LeftMenuData: MenuItemType[] = [
  {
    key: "1",
    title: "Home",
    path: "/",
    icon: <RiHome2Fill />,
    divider: false,
  },
  {
    key: "2",
    title: "My Cart",
    path: "/cart",
    icon: <RiShoppingCart2Fill />,
    divider: false,
  },
  {
    key: "3",
    title: "Catalog",
    path: "/catalog",
    icon: <RiFunctionFill />,
    divider: false,
  },
  {
    key: "4",
    title: "Contact",
    path: "/contact",
    icon: <RiMailSendFill />,
    divider: false,
  },
];
