import { MenuItemType } from "./menu-item.type";

//@material-ui
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeIcon from '@material-ui/icons/Home';

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
    title: "MyCart",
    path: "/cart",
    icon: <ShoppingCartOutlinedIcon />,
    divider: false,
  },
  {
    key: "2",
    title: "Contact",
    path: "/contact",
    icon: <MailIcon />,
    divider: false,
  },
];
