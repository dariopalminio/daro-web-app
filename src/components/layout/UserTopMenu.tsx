import React, { FunctionComponent, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SessionContext, { SessionContextType } from "../../context/SessionContext";

//@material-ui
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
  const { session } = useContext(SessionContext) as SessionContextType;

  const openAnchorEl = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLoginMenuText = () => {
    if (session && !session?.isLogged) {
      return "Login";
    } else return "Go to Logout";
  };

  return (
    <div className={clsx(classes.menuItem)}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
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
        
        <MenuItem component={Link} to="/user/login" onClick={handleClose}>
          {getLoginMenuText()}
        </MenuItem>

        {session && !session?.isRegistered && (
          <MenuItem component={Link} to="/user/register" onClick={handleClose}>
            Register
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default UserTopMenu;
