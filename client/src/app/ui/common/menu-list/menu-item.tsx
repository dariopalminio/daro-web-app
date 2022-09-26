import "./menu-list.css";
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { MenuItemType } from "./menu-item.type";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
    menuItem: MenuItemType;
    backgroundColor?: string;
    hoverColor?: string;
    style?: any;
}

/**
 * Menu Item for Menu Accordion
 */
const MenuItem: React.FC<Props> = ({ menuItem, backgroundColor, hoverColor, style }) => {
    const [styleHover, setStyleHover] = useState({});


    const handleMouseEnter = () => {
        setStyleHover(hoverColor ? { background: hoverColor } : {});
    };
    const handleMouseLeave = () => {
        setStyleHover(backgroundColor ? { background: backgroundColor } : {});
    };

    return (
        <div className="submenuItems"
            {...(backgroundColor && {
                style: { background: backgroundColor },
            })}
        >
            <Link to={menuItem.path} className="submenulink" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} style={styleHover}>
                {menuItem.icon}&nbsp;{menuItem.title}
            </Link>
        </div>

    );
};

export default MenuItem;