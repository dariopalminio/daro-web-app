//import "./menu-list.css";
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { MenuItemType } from "./menu-item.type";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const StylesSubMenuItem = styled.div`
    .submenuItems {
        display: flex;
        margin-left: 5px;
        width: 98%;
    }

    .submenulink {
        text-decoration: none;
    }

    .submenuItems .submenulink {
        display: block;
        color: #727272;
        margin-left: 0px;
        padding: 12px 0px 12px 15px;
        transition: all 0.4s ease-out;
        width: 98%;
    }

    .submenuItems:hover .submenulink:hover {
        background-color: #E5E5E5;
        color: black;
    }
`;

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
        <StylesSubMenuItem>
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
        </StylesSubMenuItem>
    );
};

export default MenuItem;