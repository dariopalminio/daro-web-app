import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai" //https://react-icons.github.io/react-icons/
import { BiWrench, BiListPlus, BiListUl, BiGridAlt } from "react-icons/bi" //https://react-icons.github.io/react-icons/
import { SidebarMenuItem } from "./SidebarMenuItem"

export const SidebarMenuData: SidebarMenuItem[] = [
  {
    title: "subpage01",
    path: "#",
    icon: <BiGridAlt />,
    iconClosed: <AiFillCaretDown />,
    iconOpened: <AiFillCaretUp />,
    subnav: [
      {
        title: "Page 01",
        path: "/subpage01/Page01",
        icon: <BiListUl />,
      },
      {
        title: "Page 02",
        path: "/subpage01/Page02",
        icon: <BiListPlus />,
      },
    ],
  },
  {
    title: "Page 04",
    path: "/subpage02/page04",
    icon: <BiWrench />,
  },
]
