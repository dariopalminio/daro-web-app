import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import useLogout from "../../../../../domain/hook/user/logout.hook";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();


  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout(undefined);
  };

  const givenName = () => {
    return 'to do'; //session.given_name
  }

  return (
    <div >

      <Alert severity="success">

        {session?.given_name}  {t('logout.success.already.logged')} {" "}
      </Alert>

      <br />

      <div className={clsx(classes.wrapperCenter)}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickLogoutHandler()}
        >
          {t('logout.command')}
        </Button>
      </div>

    </div>
  );
};

export default Logout;
