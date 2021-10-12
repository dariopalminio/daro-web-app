import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import useLogout from "../../../../../domain/hook/user/logout.hook";

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
  const { session } = useContext(SessionContext) as ISessionContext;
  const { logout } = useLogout();
  const classes = useStyles();

  //content text
  const success_already_logged = "You are already logged! Do you want to log out?";
  const command_logout = "Logout";

  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout(session);
  };

  return (
    <div >
      <Alert severity="success">
        {session && session.given_name}  {success_already_logged} {" "}
      </Alert>
      <br />
      <div className={clsx(classes.wrapperCenter)}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickLogoutHandler()}
        >
          {command_logout}
        </Button>
      </div>
    </div>
  );
};

export default Logout;
