import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import Logout from "./logout";
import Login from "./login";
import { useTranslation } from 'react-i18next';
import Alert from "@material-ui/lab/Alert";

/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Auth: FunctionComponent = () => {
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
    <div id="LoginFormContainer" data-testid="LoginFormContainer">
      {isNotLogged() && <Login />}

      {needToVerifyEmail() &&
        <Alert severity="warning">
          Warning: {t('auth.info.must.verify.email')}
          <br />{" "}
        </Alert>
      }

      {isLogged() && <Logout />}


    </div>
  );
};

export default Auth;
