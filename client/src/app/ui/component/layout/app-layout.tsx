import { FunctionComponent, useContext } from "react";
import { atom, useAtom } from "jotai";
import clsx from "clsx";
import MainContainer from "./main-container";
import TopNavBar from "./top-nav-bar";
import LeftNavBar from "./left-nav-bar";
import { useTranslation } from 'react-i18next';

//@material-ui
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export const openLeftStatus = atom(false);

/**
 * AppLayout Function Component
 * 
 * @visibleName AppLayout View
 */
const AppLayout: FunctionComponent = () => {
  const [openLeft] = useAtom(openLeftStatus);
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <div id="AppLayout" data-testid="AppLayout" className={classes.root}>
      
      <CssBaseline />
      <TopNavBar />
      <LeftNavBar />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openLeft,
        })}
      >
        <div className={classes.drawerHeader} />
        <MainContainer />
      </main>
    </div>
  );
};

export default AppLayout;
