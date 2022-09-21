import { MenuItemType } from "../../common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiHome2Fill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill} from "react-icons/ri";


export const TopMenuDataForNotLogged: MenuItemType[] = [
  {
    key: "1",
    title: "Login",
    path: "/user/auth",
    icon: <RiShieldUserFill />,
    divider: false,
  },
  {
    key: "2",
    title: "Register",
    path: "/user/register/form",
    icon: <RiUserAddFill />,
    divider: false,
  },
  {
    key: "3",
    title: "Profile",
    path: "/user/profile",
    icon: <RiUserSearchFill />,
    divider: false,
  },
];

export const TopMenuDataForLogged: MenuItemType[] = [
    {
      key: "1",
      title: "Logout",
      path: "/user/auth",
      icon: <RiShieldUserFill />,
      divider: false,
    },
    {
      key: "2",
      title: "Profile",
      path: "/user/profile",
      icon: <RiUserSearchFill />,
      divider: false,
    },
  ];
