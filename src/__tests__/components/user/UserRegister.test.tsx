import * as ReactDOM from "react-dom";
import UserRegister from "../../../components/user/UserRegister";

describe("Renders UserRegister component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<UserRegister />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  test("Renders correctly initial document", () => {
    const forms = container.querySelectorAll("form");
    const inputs = container.querySelectorAll("input");
    const buttons = container.querySelectorAll("button");
    expect(forms).toHaveLength(1);
    expect(inputs).toHaveLength(5);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].type).toBe("submit");
  });
});
