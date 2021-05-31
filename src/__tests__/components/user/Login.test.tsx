import React, { FunctionComponent } from "react";
import { screen, render } from "@testing-library/react";
import Login from "../../../components/user/Login";

describe("Login component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("test form structure", () => {
    expect(screen.queryByText(/Login Form/i)).toBeInTheDocument();

    const formElement: HTMLFormElement = screen.getByTestId(
      "LoginForm"
    ) as HTMLFormElement;

    expect(formElement).toBeInTheDocument;
    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByRole("button")).toBeInTheDocument;
  });
});
