
import PassRecoveryForm from "../../../component/user/recovery/pass-recovery-form";
import {
  RouteComponentProps,
} from "react-router-dom";

type TParams = { token: string };

export function PassRecoveryFormPage({
  match,
}: RouteComponentProps<TParams>)
 {
  return (
    <div className="container-page">
      <br />
      <PassRecoveryForm token={match.params.token}/>
    </div>
  );
};