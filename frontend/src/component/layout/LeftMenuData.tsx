import { MenuItemType } from "./MenuItemType";

//@material-ui
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

/**
 * Data of Menu List for Left Nav Bar
 */
export const LeftMenuData: MenuItemType[] = [
  {
    key: "1",
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
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
