import { FunctionComponent, useContext } from "react";
import SessionContext, {
  SessionContextType,
} from "../../../../domain/context/SessionContext";
import useLogout from "../../../../domain/hook/useLogout";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Logout: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as SessionContextType;
  const { logout } = useLogout();
  const classes = useStyles();

  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout(session);
  };

  return (
    <div >
      <Alert severity="success">
        {session && session.given_name} You are already logged! Do you want to
        log out?{" "}
      </Alert>
      <br />
      <div className={clsx(classes.wrapperCenter)}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickLogoutHandler()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Logout;
