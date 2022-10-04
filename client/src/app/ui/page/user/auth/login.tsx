import  { FunctionComponent } from "react";
import useLogin from "domain/hook/auth/login.hook";
import Alert from "app/ui/common/alert/alert";
import { useTranslation } from 'react-i18next';
import CircularProgress from "app/ui/common/progress/circular-progress";
import LoginForm from "app/ui/component/user/auth/login-form";
import { useHistory } from "react-router-dom";


interface Props {
  redirectToPath?: string; 
}

/**
 * Login Function Component
 * (Stateful/Container/Smart component)
 * @visibleName Login View
 */
 const Login: React.FC<Props> = ({ redirectToPath }) => {


  const {
    isProcessing,
    hasError,
    msg,
    isSuccess,
    login,
  } = useLogin();

  const history = useHistory();
  const { t } = useTranslation();

  /**
   * Login
   */
  const handleLoginSubmit = (email: string, password: string): void => {
    //e.preventDefault();
    login(email, password);
  };

  const redirectToPage = () => {
    history.push(redirectToPath? redirectToPath : "/");
  }

  return (
    <div>

      {!isSuccess && (
        <LoginForm onSubmit={(email: string, password: string) => handleLoginSubmit(email, password)} 
          style={{width: "300px", margin: "34px auto auto auto"}}/>
      )}

      <br />

      {isProcessing && (
        <CircularProgress>{t('login.info.loading')}</CircularProgress>
      )}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isSuccess && (
        redirectToPage()
      )}

    </div>
  );
};

export default Login;
