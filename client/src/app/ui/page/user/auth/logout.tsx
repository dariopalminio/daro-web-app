import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import useLogout from "domain/hook/auth/logout.hook";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import Alert from "app/ui/common/alert/alert";

/**
 * Login Function Component
 *
 * @visibleNa (Stateful/Container/Smart component)me Login View
 */
const Logout: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const { logout } = useLogout();
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

      <div>
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
