import { FunctionComponent } from "react";
import { atom, useAtom } from "jotai";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "./MainContainer";
import TopNavBar from "./TopNavBar";
import LeftNavBar from "./LeftNavBar";

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
