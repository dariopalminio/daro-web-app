import "./menu-list-float.css";
import { Link } from "react-router-dom";
import { MenuItemType } from "../menu-list/menu-item.type";

interface Props {
    isOpen: boolean;
    permission?: string;
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
const MenuListFloat: React.FC<Props> = ({ isOpen, permission, menuList, onClick }) => {

    const isShowed = (item: MenuItemType) => {
        return permission? item.access.includes(permission) : false;
    }

    return (<>
        {isOpen && (

            <div className="menu_float">
                {menuList.map((item, index) => {
                    if (isShowed(item))
                        return (
                            <div className="menu_float_items">
                                <Link to={item.path} className="menu_float_link" onClick={() => onClick()}>
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