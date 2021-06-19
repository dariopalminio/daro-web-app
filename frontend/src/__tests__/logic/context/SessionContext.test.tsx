import * as ReactDOM from "react-dom";
import { useContext } from "react";
import SessionContext, {
  SessionContextType,
} from "../../../logic/context/SessionContext";
import SessionContextProvider from "../../../view/provider/SessionContextProvider";


describe("Test SessionContext & SessionContextProvider", () => {

  test("Renders when session is Not Logged", () => {
    let container: HTMLDivElement;

    const TestNotLoggedComponent = () => {
      const { session, removeSessionValue } = useContext(
        SessionContext
      ) as SessionContextType;

      return (
        <SessionContextProvider>
          <div data-testid="test">
            {!session?.isLogged && <label>Not Logged</label>}
          </div>
        </SessionContextProvider>
      );
    };

    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<TestNotLoggedComponent />, container);

    const label = container.querySelectorAll("label");
    expect(label).toHaveLength(1);

    document.body.removeChild(container);
    container.remove();
  });

});
