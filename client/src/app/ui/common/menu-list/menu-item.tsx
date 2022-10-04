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
        margin-left: 0px;
        width: 100%;
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
        width: 100%;
    }

    .submenuItems:hover .submenulink:hover {
        background: #E5E5E5;
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

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setStyleHover(hoverColor ? { background: hoverColor } : {});
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setStyleHover(backgroundColor ? { background: backgroundColor } : {});
    };

    /**
const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
     */
    return (
        <StylesSubMenuItem>
        <div className="submenuItems"
            {...(backgroundColor && {
                style: { background: backgroundColor },
            })}
        >
            <Link to={menuItem.path} className="submenulink" onMouseEnter={(e)=>handleMouseEnter(e)}
                onMouseLeave={(e)=>handleMouseLeave(e)} style={styleHover}>
                {menuItem.icon}&nbsp;{menuItem.title}
            </Link>
        </div>
        </StylesSubMenuItem>
    );
};

export default MenuItem;