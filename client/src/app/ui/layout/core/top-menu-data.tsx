import { MenuItemType, AccessType } from "../../common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiAccountCircleFill, RiHome2Fill, RiShoppingCart2Fill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill} from "react-icons/ri";


export const TopMenuDataForNotLogged: MenuItemType[] = [
  {
    key: "1",
    title: "Login",
    path: "/user/auth",
    icon: <RiShieldUserFill />,
    access: [AccessType.ANONYMOUS],
    divider: false,
    submenu: null
  },
  {
    key: "1",
    title: "Logout",
    path: "/user/auth",
    icon: <RiShieldUserFill />,
    access: [AccessType.USER],
    divider: false,
    submenu: null
  },
  {
    key: "2",
    title: "Register",
    path: "/user/register/form",
    icon: <RiUserAddFill />,
    access: [AccessType.ANONYMOUS],
    divider: false,
    submenu: null
  },
  {
    key: "3",
    title: "Profile",
    path: "/user/profile",
    icon: <RiUserSearchFill />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: null
  },
];

export const TopMenuData: MenuItemType[] = [
  {
    key: "1",
    title: "User",
    path: "/",
    icon: <RiAccountCircleFill size={24} />,
    access: [AccessType.ANONYMOUS, AccessType.USER],
    divider: false,
    submenu: TopMenuDataForNotLogged
  },
];