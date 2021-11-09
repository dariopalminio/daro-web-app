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
  const { t, i18n } = useTranslation();


  return (
    <div id="LoginFormContainer" data-testid="LoginFormContainer">
      {!session?.isLogged && <Login />}

      {session?.isLogged && !session?.email_verified && 
        <Alert severity="warning">
          Warning: {t('auth.info.must.verify.email')}
          <br />{" "}
        </Alert>
        }
  
      {session?.isLogged && <Logout />}


    </div>
  );
};

export default Auth;
