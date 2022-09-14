import { MenuItemType } from "./menu-item.type";

//@material-ui
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

/**
 * Data of Menu List for Left Nav Bar
 */
export const LeftMenuData: MenuItemType[] = [
  {
    key: "1",
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    divider: false,
  },
  {
    key: "2",
    title: "My Cart",
    path: "/cart",
    icon: <ShoppingCartOutlinedIcon />,
    divider: false,
  },
  {
    key: "3",
    title: "Catalog",
    path: "/catalog",
    icon: <AppsIcon />,
    divider: false,
  },
  {
    key: "4",
    title: "Contact",
    path: "/contact",
    icon: <MailIcon />,
    divider: false,
  },
];
