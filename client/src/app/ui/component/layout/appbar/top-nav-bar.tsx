import { FunctionComponent } from "react";
import { useAtom } from "jotai";
import clsx from "clsx";
import logo from "../../../image/logo_app.png";
import styled from "styled-components";
import { openLeftStatus } from "../app-layout";
import UserTopMenu from "./user-top-menu";
import CartTopMenu from "./cart-top-menu";

//@material-ui
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const LogoImg = styled.img``;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolBar: {
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    containerTopMenu: {
      display: "flex",
      flexGrow: 100,
      justifyContent: "flex-end",
    },
    logo: {
      width: "34",
      height: "34",
    },
  })
);

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
const TopNavBar: FunctionComponent = () => {
  const classes = useStyles();
  const [openSideBar, setOpenSideBar] = useAtom(openLeftStatus);

  const handleDrawerOpen = () => {
    setOpenSideBar(true);
  };

  return (
    <AppBar  
      color="transparent"
      data-testid="AppBar"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openSideBar,
      })}
    >
      <Toolbar className={clsx(classes.toolBar)}>
      
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, openSideBar && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

    
        <UserTopMenu />

        <CartTopMenu/>
        
        <div className={clsx(classes.containerTopMenu)}>
        <LogoImg className={clsx(classes.logo)} src={logo} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
