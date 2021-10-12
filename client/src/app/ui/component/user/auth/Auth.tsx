import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import Logout from "./logout";
import Login from "./login";
import Alert from "@material-ui/lab/Alert";

/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Auth: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const warning_need_verify_the_email = "You need verify the email!";

  return (
    <div id="LoginFormContainer" data-testid="LoginFormContainer">

      {!session?.isLogged && <Login />}

      {session?.isLogged && !session?.email_verified && 
        <Alert severity="warning">
          Warning: {warning_need_verify_the_email}
          <br />{" "}
        </Alert>
        }
  
      {session?.isLogged && <Logout />}


    </div>
  );
};

export default Auth;
