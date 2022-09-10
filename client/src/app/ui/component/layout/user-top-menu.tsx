import React, { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SessionContext, { ISessionContext } from "../../../../domain/context/session.context";
import { useTranslation } from 'react-i18next';

//@material-ui
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import IconButton from "@material-ui/core/IconButton";
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
      return <AccountCircle />;
    } else return <AccountCircleOutlined />;
  };

  return (
    <div className={clsx(classes.menuItem)}>
      <IconButton
        aria-label= {t('account.current.user')}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
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
