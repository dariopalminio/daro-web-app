import "./menu-list.css";
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { MenuItemType } from "./menu-item.type";
import { Link } from "react-router-dom";

interface Props {
    menuList: MenuItemType[];
}

/**
 * Menu Accordion
 */
/**
   <ListItem button key={item.key} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
 */
const MenuList: React.FC<Props> = ({ menuList }) => {

    return (
        <div>
            {menuList.map((item, index) => {
                return (
                    <div className="submenuItems">
                        <Link to={item.path} className="submenulink">
                            {item.icon}&nbsp;{item.title}
                        </Link>
                    </div>
                );
            })}

        </div>
    );
};

export default MenuList;