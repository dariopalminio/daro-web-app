import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../domain/context/session.context";
import Logout from "./Logout";
import Login from "./Login";
import Alert from "@material-ui/lab/Alert";

/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Auth: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;

  return (
    <div id="LoginFormContainer" data-testid="LoginFormContainer">

      {!session?.isLogged && <Login />}

      {session?.isLogged && !session?.email_verified && 
        <Alert severity="warning">
          Warning: {"You need verify the email!"}
          <br />{" "}
        </Alert>
        }
  
      {session?.isLogged && <Logout />}


    </div>
  );
};

export default Auth;
