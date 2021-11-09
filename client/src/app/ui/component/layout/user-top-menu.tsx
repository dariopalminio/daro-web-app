import React, { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SessionContext, { ISessionContext } from "../../../../domain/context/session.context";

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
  
  //content text
  const command_login = "Login";
  const command_logout = "Go to Logout";
  const command_register = "Register";
  const label_account_of_current_user = "account of current user";

  const openAnchorEl = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLoginMenuText = () => {
    if (session && !session?.isLogged) {
      return command_login;
    } else return command_login;
  };

  const getUserProfileIcon = () => {
    if (session && session?.isLogged) {
      return <AccountCircle />;
    } else return <AccountCircleOutlined />;
  };

  return (
    <div className={clsx(classes.menuItem)}>
      <IconButton
        aria-label={label_account_of_current_user}
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

        {session && !session?.isRegistered && (
          <MenuItem component={Link} to="/user/register/form" onClick={handleClose}>
            {command_register}
          </MenuItem>
        )}

        <MenuItem component={Link} to="/user/profile" onClick={handleClose}>
          Profile
        </MenuItem>

      </Menu>
    </div>
  );
};

export default UserTopMenu;
