import { MenuItemType } from "../menu-list/menu-item.type";
import MenuIconButtonItem from "./menu-icon-button-item";

interface Props {
    isOpen?: boolean;
    permission?: string;
    menuList: MenuItemType[];
    onClick?: () => void;
    style?: any;
}

/**
 * Menu Icon-Button
 * Stateless components, extensible Style and controlled component
 */
const MenuIconButton: React.FC<Props> = ({ isOpen, permission, menuList, onClick, style }) => {

    const isShowed = (item: MenuItemType) => {
        return permission ? item.access.includes(permission) : false;
    }

    return (<>
        {menuList.map((item, index) => {
            if (isShowed(item))
                return (
                        <MenuIconButtonItem 
                        permission={permission} 
                        item={item} 
                        style={style}
                        />

                );
        })}
    </>
    );
};

export default MenuIconButton;