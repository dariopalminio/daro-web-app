import { AccessType, MenuItemType } from "../../common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiFunctionFill } from "react-icons/ri";
import { RiMailSendFill} from "react-icons/ri";
//RiShieldUserFill -->Usuario login
//RiUserAddFill --> register
//RiDoorClosedLine --> logout


/**
 * Data of Menu List for Left Nav Bar
 */
export const LeftMenuData: MenuItemType[] = [
  {
    key: "1",
    title: "Home",
    path: "/",
    icon: <RiHome2Fill />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: null
  },
  {
    key: "2",
    title: "My Cart",
    path: "/cart",
    icon: <RiShoppingCart2Fill />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: null
  },
  {
    key: "3",
    title: "Catalog",
    path: "/catalog",
    icon: <RiFunctionFill />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: null
  },
  {
    key: "4",
    title: "Contact",
    path: "/contact",
    icon: <RiMailSendFill />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: null
  },
];
