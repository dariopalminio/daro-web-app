import { FunctionComponent } from "react";
import RegisterConfirmEmail from "../../../component/user/register/register-confirm-email";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";

type TParams = { token: string };

/**
 * RegisterConfirmEmailPage
 * This page receives a 'token' parameter and passes it to the child component.
 * @param param0 
 * @returns 
 */
export function RegisterConfirmEmailPage({
  match,
}: RouteComponentProps<TParams>) {
  return (
    <>
      <br />
      <RegisterConfirmEmail token={match.params.token} />
    </>
  );
}
