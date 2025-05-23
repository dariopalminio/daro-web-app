import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import Logout from "./logout";
import Login from "./login";
import { useTranslation } from 'react-i18next';
import Alert from "app/ui/common/alert/alert";

/**
 * AuthPage for Login or Logout options
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const AuthPage: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();


  const isNotLogged = () => {
    return session && !session.isLogged;
  };

  const isLogged = () => {
    return session && session.isLogged;
  };

  const needToVerifyEmail = () => {
    return false //((session && session.isLogged) && !session.email_verified);
  };

  return (
    <>
      <div className="page_container" data-testid="page_container_auth">
      {isNotLogged() && <Login redirectToPath={"/"}/>}

      {needToVerifyEmail() &&
        <Alert severity="warning">
          Warning: {t('auth.info.must.verify.email')}
          <br />{" "}
        </Alert>
      }

      {isLogged() && <Logout />}

    </div>
    </>
  );
};

export default AuthPage;