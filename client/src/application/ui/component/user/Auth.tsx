import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "../../../../domain/context/session.context";
import Logout from "./Logout";
import Login from "./Login";

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

      {session?.isLogged && <Logout />}

    </div>
  );
};

export default Auth;
