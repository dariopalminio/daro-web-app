import useRegisterConfirmEmail from "../../../../../domain/hook/user/register-confirm-email.hook";
import emailOkImage from "../../../image/email_ok.png";
import { useTranslation } from 'react-i18next';

//@material-ui
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";


type TParams = { token: string };

/**
 * User Register Confirm Email.
 * @visibleName UserRegisterConfirmEmail
 */
function RegisterConfirmEmail({ token }: TParams) {
  const { executed, loading, confirmed, error, msg, validateEmail } =
    useRegisterConfirmEmail();
  const { t, i18n } = useTranslation();

  return (
    <div>

      {!executed && validateEmail(token)}

      {loading && (
          <CircularProgress />
      )}

      {(confirmed && !loading) &&
      (<div>
        <img src={String(emailOkImage)} alt="emailOkImage" style={{width:"25%", height:"25%"}}/>
      <Alert severity="success">{msg}</Alert>
      </div>
      )
      }

      {(!confirmed && !loading && error) && <Alert severity="error">{msg}</Alert>}

    </div>
  );
}

export default RegisterConfirmEmail;
