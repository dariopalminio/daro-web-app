import React, { FunctionComponent, useContext } from "react";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import { useTranslation } from 'react-i18next';
import IconButton from "../../../common/icon-button/icon-button";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import MenuListFloat from "../../../common/menu-list-float/menu-list-float";
import { TopMenuDataForLogged, TopMenuDataForNotLogged } from "../top-menu-data";
import styled from "styled-components";

/**
 * UserTopMenu Function Component
 *
 * @visibleName UserTopMenu View
 */
const UserTopMenu: FunctionComponent = () => {
  
  const [isOpen, setIsOpen] = React.useState(false);
  const { session } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();

  const getMenuData = () => {
    if (!session?.isLogged) {
      return TopMenuDataForNotLogged;
    } else return TopMenuDataForLogged;
  };

  const getUserProfileIcon = () => {
    if (session?.isLogged) {
      return <RiAccountCircleLine size={20}/>;
    } else return <RiAccountCircleFill size={20}/>;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };

  const UserMenuContainer = styled.div`
  position: relative;
  rigt: 1em;
  display: flex;
  `;
  
  return (
    <UserMenuContainer>

      <IconButton
        onClick={()=>toggleMenu()}
      >
        {getUserProfileIcon()}
      </IconButton>

      <MenuListFloat isOpen={isOpen} menuList={getMenuData()} onClick={()=>toggleMenu()}/>

    </UserMenuContainer>
  );
};

export default UserTopMenu;
