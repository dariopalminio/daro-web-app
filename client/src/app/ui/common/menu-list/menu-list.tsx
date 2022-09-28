import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { MenuItemType } from "./menu-item.type";
import { Link } from "react-router-dom";
import MenuItem from "./menu-item";

interface Props {
    permission?: string;
    menuList: MenuItemType[];
    backgroundColor?: string;
    hoverColor?: string;
    style?: any;
}

/**
 * Menu Accordion
 */
const MenuList: React.FC<Props> = ({ permission, menuList, backgroundColor, hoverColor, style }) => {

    const isShowed = (item: MenuItemType) => {
        return permission? item.access.includes(permission) : false;
    }

    return (
        <div 
        {...(style && 
            (style={style})
          )}>
            {menuList.map((item, index) => {
                if (isShowed(item))
                return (
                    <MenuItem menuItem={item} backgroundColor={backgroundColor} hoverColor={hoverColor}></MenuItem>
                );
            })}

        </div>
    );
};

export default MenuList;