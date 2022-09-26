import React, { FunctionComponent, useState } from "react";
import useLogin from "../../../../../domain/hook/auth/login.hook";
import Alert from "../../../common/alert/alert";
import { useTranslation } from 'react-i18next';
import CircularProgress from "../../../common/progress/circular-progress";
import LoginForm from "../../../component/user/auth/login-form";


/**
 * Login Function Component
 *
 * @visibleName Login View
 */
const Login: FunctionComponent = () => {

  const {
    isProcessing,
    hasError,
    msg,
    isSuccess,
    login,
  } = useLogin();

  const { t } = useTranslation();

  /**
   * Login
   */
  const handleLoginSubmit = (email: string, password: string): void => {
    //e.preventDefault();
    login(email, password);
  };

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

    </div>
  );
};

export default Login;
