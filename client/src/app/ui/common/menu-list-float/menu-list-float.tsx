import { Link } from "react-router-dom";
import { MenuItemType } from "../menu-list/menu-item.type";
import styled from "styled-components";

const StylesMenuListFloat = styled.div`
    .menu_float {
        position: absolute;
        width: 200px;
        background: #F9F9F9;
        top: 30px;
        right: -10px;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        z-index: 1;
    }

    .menu_float_items {
        display: block;
        background: #F9F9F9;
        margin-left: 5px;
        width: 90%;
        z-index: 2;
    }

    .menu_float_link {
        text-decoration: none;
    }

    .menu_float_items .menu_float_link {
        display: block;
        color: #727272;
        margin-left: 0px;
        padding: 12px 0px 12px 15px;
        transition: all 0.4s ease-out;
        width: 98%;
    }

    .menu_float_items:hover .menu_float_link:hover {
        background-color: #E5E5E5;
        border-radius: 5px;
        color: black;
    }
`;

interface Props {
    isOpen: boolean;
    permission?: string;
    menuList: MenuItemType[];
    onClick: () => void;
}

/**
 * MenuListFloat
 * Stateless components and controlled component
 */
/**
   <ListItem button key={item.key} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
 */
const MenuListFloat: React.FC<Props> = ({ isOpen, permission, menuList, onClick }) => {

    const isShowed = (item: MenuItemType) => {
        return permission ? item.access.includes(permission) : false;
    }

    return (<>
        {isOpen && (
            <StylesMenuListFloat>
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
                </div>
            </StylesMenuListFloat>
        )}
    </>
    );
};

export default MenuListFloat;