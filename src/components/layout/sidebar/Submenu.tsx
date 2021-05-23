import { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SidebarMenuItem } from './SidebarMenuItem'
import './Submenu.css'

type SidebarLinkProps = {
    item: SidebarMenuItem
};

const SidebarLink = styled(Link)`
    &:hover {
        background-color: #1f1f1b;
        border-left: 4px solid #6d44dc;
    }
`

const SidebarLabel = styled.span``

const DropdownLink = styled(Link)`
    &:hover {
        background-color: #6d44dc;
    }
`

const Submenu: FunctionComponent<SidebarLinkProps> = ({ item }) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)

    return (
        <div>
            <SidebarLink className="SidebarLink" to={item.path} onClick={showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel className="SidebarLabel">{item.title}</SidebarLabel>
                </div>
                <div>{item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}</div>
            </SidebarLink>
            {subnav &&
                item?.subnav?.map((subnavItem, index) => {
                    return (
                        <DropdownLink className="DropdownLink" to={subnavItem.path} key={index}>
                            {subnavItem.icon}
                            <SidebarLabel>{subnavItem.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </div>
    );
};

export default Submenu
