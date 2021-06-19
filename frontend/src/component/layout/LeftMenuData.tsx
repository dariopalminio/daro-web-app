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
    title: "Page 3",
    path: "/subpage01/page03",
    icon: <InboxIcon />,
    divider: false,
  },
  {
    key: "2",
    title: "Page 4",
    path: "/subpage02/page04",
    icon: <MailIcon />,
    divider: false,
  },
];
