import useRegisterConfirmEmail from "../../../../domain/hook/register.confirm.email.hook";

//@material-ui
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";


type TParams = { token: string };

/**
 * UserRegisterConfirmEmail
 * @visibleName UserRegisterConfirmEmail
 */
function UserRegisterConfirmEmail({ token }: TParams) {
  const { verified, loading, error, msg, validateEmail } =
    useRegisterConfirmEmail();


  return (
    <div>
      {!loading && validateEmail(token)}
      {verified=='loading' && (
          <CircularProgress />
      )}
      {verified=='true' && <Alert severity="success">{msg}</Alert>}
      {verified=='false' && <Alert severity="error">{msg}</Alert>}
    </div>
  );
}

export default UserRegisterConfirmEmail;
