
import { Link } from "react-router-dom";
import { MenuItemType } from "../menu-list/menu-item.type";
import styled from "styled-components";
import IconButton from "../icon-button/icon-button";
import MenuIconButtonItem from "./menu-icon-button-item";

interface Props {
    isOpen?: boolean;
    permission?: string;
    menuList: MenuItemType[];
    onClick?: () => void;
    style?: any;
}

const MenuIconButton: React.FC<Props> = ({ isOpen, permission, menuList, onClick, style }) => {

    const isShowed = (item: MenuItemType) => {
        return permission ? item.access.includes(permission) : false;
    }

    return (<>

        {menuList.map((item, index) => {
            if (isShowed(item))
                return (
                        <MenuIconButtonItem permission={permission} item={item} style={style}/>

                );
        })}


    </>
    );
};

export default MenuIconButton;