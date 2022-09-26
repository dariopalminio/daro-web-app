import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import useLogout from "../../../../../domain/hook/auth/logout.hook";
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import Alert from "../../../common/alert/alert";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
    buttonCustom: {
      margin: "0 auto auto auto",
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
    logout(session);
  };

  return (
    <div >

      <Alert severity="success">

        {session?.given_name}  {t('logout.success.already.logged')} {" "}
      </Alert>

      <br />

      <div className={clsx(classes.wrapperCenter)}>
        <Button
          onClick={() => onClickLogoutHandler()}
        >
          {t('logout.command')}
        </Button>
      </div>

    </div>
  );
};

export default Logout;
