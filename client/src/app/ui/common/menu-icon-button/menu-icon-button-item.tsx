
import { Link, useHistory } from "react-router-dom";
import { MenuItemType } from "../menu-list/menu-item.type";
import styled from "styled-components";
import IconButton from "../icon-button/icon-button";
import React from "react";
import MenuListFloat from "../menu-list-float/menu-list-float";
//<RiAccountCircleFill size={20} /> user

const MenuIconButtonItemContainer = styled.div`
    position: relative;
    rigt: 1em;
    display: flex;
`;

interface Props {
    permission?: string;
    item: MenuItemType;
    onClick?: () => void;
    style?: any;
}

/**
 * Menu Item for Menu Icon-Button
 */
const MenuIconButtonItem: React.FC<Props> = ({ permission, item, onClick, style }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const history = useHistory();

    const toggleMenu = () => {
        if (item.submenu === null) history.push(item.path)
        else setIsOpen(!isOpen);
    };

    const isShowed = (item: MenuItemType) => {

        return permission ? item.access.includes(permission) : false;
    }

    const getSubmenuData = (): MenuItemType[] => {
        return item.submenu ? item.submenu : [];
    };

    const handleClick = () => {
        history.push("/cart");
    };

    return (<MenuIconButtonItemContainer
        {...(style && 
            (style= {style})
          )}>
        <IconButton onClick={() => toggleMenu()}
        >
            {item.icon}
        </IconButton>

        {((item.submenu) && (
            <MenuListFloat
                isOpen={isOpen}
                permission={permission}
                menuList={getSubmenuData()}
                onClick={() => toggleMenu()}
            />
        ))}
    </MenuIconButtonItemContainer>
    );
};

export default MenuIconButtonItem;