import { FunctionComponent } from "react";
import { useAtom } from "jotai";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { openLeftStatus } from "./AppLayout";
import UserTopMenu from "./UserTopMenu";
import logo from "../../images/logo_app.png";
import styled from "styled-components";

const LogoImg = styled.img``;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
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
  })
);

/**
 * TopNavBar Function Component
 * @returns 
 */
const TopNavBar: FunctionComponent = () => {
  const classes = useStyles();
  const [openLeft, setOpenLeft] = useAtom(openLeftStatus);

  const handleDrawerOpen = () => {
    setOpenLeft(true);
  };

  return (
    <AppBar  
      data-testid="AppBar" 
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openLeft,
      })}
    >
      <Toolbar className={clsx(classes.toolBar)}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, openLeft && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

        <LogoImg className="Logo" src={logo} />

        <div className={clsx(classes.containerTopMenu)}>
          <UserTopMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
