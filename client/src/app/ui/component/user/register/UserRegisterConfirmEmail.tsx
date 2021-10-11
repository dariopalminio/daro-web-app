import useRegisterConfirmEmail from "../../../../../domain/hook/user/register.confirm.email.hook";
import emailOkImage from "../../../image/email_ok.png";
        
//@material-ui
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";


type TParams = { token: string };

/**
 * User Register Confirm Email.
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
      {verified=='true' && 
      (<div>
        <img src={String(emailOkImage)} alt="emailOkImage" style={{width:"25%", height:"25%"}}/>
      <Alert severity="success">{msg}</Alert>
      </div>
      )
      }
      {verified=='false' && <Alert severity="error">{msg}</Alert>}
    </div>
  );
}

export default UserRegisterConfirmEmail;
