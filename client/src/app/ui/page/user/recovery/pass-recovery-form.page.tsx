import { FunctionComponent } from "react";
import PassRecoveryForm from "../../../component/user/recovery/pass-recovery-form";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";

type TParams = { token: string };

export function PassRecoveryFormPage({
  match,
}: RouteComponentProps<TParams>)
 {
  return (
    <>
      <br />
      <PassRecoveryForm token={match.params.token}/>
    </>
  );
};