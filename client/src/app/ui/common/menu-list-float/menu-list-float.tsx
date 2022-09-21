import "./menu-list-float.css";
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MenuItemType } from "../menu-list/menu-item.type";

interface Props {
    isOpen: boolean;
    menuList: MenuItemType[];
    onClick: () => void;
}

/**
 * MenuListFloat
 */
/**
   <ListItem button key={item.key} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
 */
const MenuListFloat: React.FC<Props> = ({ isOpen, menuList, onClick }) => {

    return (<>
    {isOpen && (

        <div className="menu_float">
            {menuList.map((item, index) => {
                return (
                    <div className="menu_float_items">
                        <Link to={item.path} className="menu_float_link" onClick={()=>onClick()}>
                            {item.icon}&nbsp;{item.title}
                        </Link>
                    </div>
                );
            })}

        </div>)}
        </>
    );
};

export default MenuListFloat;