import React, { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SessionContext, { ISessionContext } from "../../../../../domain/context/session.context";
import { useTranslation } from 'react-i18next';
import IconButton from "../../../common/icon-button/icon-button";
import { RiUserFill } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";

//@material-ui
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      position: "relative",
      rigt: "1em",
    },
  })
);

/**
 * UserTopMenu Function Component
 *
 * @visibleName UserTopMenu View
 */
const UserTopMenu: FunctionComponent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { session } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();

  const openAnchorEl = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLoginMenuText = () => {
    if (!session?.isLogged) {
      return t('login.command');
    } else return t('logout.command');
  };

  const getUserProfileIcon = () => {
    if (session?.isLogged) {
      return <RiUserLine size={20}/>;
    } else return <RiUserFill size={20}/>;
  };

  const handleViewCart = () => {
    alert("view cart");
  };

  return (
    <div className={clsx(classes.menuItem)}>

      <IconButton
        onClick={handleMenu}
      >
        {getUserProfileIcon()}
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openAnchorEl}
        onClose={handleClose}
      >

        <MenuItem component={Link} to="/user/auth" onClick={handleClose}>
          {getLoginMenuText()}
        </MenuItem>

        {!session?.isLogged && (
          <MenuItem component={Link} to="/user/register/form" onClick={handleClose}>
            {t('register.command')}
          </MenuItem>
        )}

        <MenuItem component={Link} to="/user/profile" onClick={handleClose}>
          {t('profile.command')}
        </MenuItem>

      </Menu>
    </div>
  );
};

export default UserTopMenu;
