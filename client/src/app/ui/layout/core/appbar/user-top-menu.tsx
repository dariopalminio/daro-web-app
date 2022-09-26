import React, { FunctionComponent, useContext } from "react";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import { useTranslation } from 'react-i18next';
import IconButton from "../../../common/icon-button/icon-button";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import MenuListFloat from "../../../common/menu-list-float/menu-list-float";
import { TopMenuDataForNotLogged } from "../top-menu-data";
import styled from "styled-components";
import { AccessType } from "../../../common/menu-list/menu-item.type";

/**
 * UserTopMenu Function Component
 *
 * @visibleName UserTopMenu View
 */
const UserTopMenu: FunctionComponent = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const { session, permission } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();

  const getMenuData = () => {
    if (!session?.isLogged) {
      return TopMenuDataForNotLogged;
    } else return TopMenuDataForNotLogged;
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
        onClick={() => toggleMenu()}
      >
        <RiAccountCircleFill size={24} />
      </IconButton>

      <MenuListFloat
        isOpen={isOpen}
        permission={permission}
        menuList={getMenuData()}
        onClick={() => toggleMenu()}
      />

    </UserMenuContainer>
  );
};

export default UserTopMenu;
