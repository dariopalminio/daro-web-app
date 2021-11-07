import React, { useState, useContext } from "react";
import useRegister from "../../../../../domain/hook/user/register.hook";
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
  const [isExecuted, setIsExecuted] = useState(false);
  const { isProcessing, isSuccess, hasError, msg, confirmAccount } = useRegister();
  const { t, i18n } = useTranslation();

  const executeConfirmRequest = () => {
    setIsExecuted(true);
    confirmAccount(token);
  };

  return (
    <div>

      {!isExecuted && executeConfirmRequest()}

      {isProcessing && (
          <CircularProgress />
      )}

      {(isSuccess && !isProcessing) &&
      (<div>
        <img src={String(emailOkImage)} alt="emailOkImage" style={{width:"25%", height:"25%"}}/>
      <Alert severity="success">{t(msg)}</Alert>
      </div>
      )
      }

      {(!isSuccess && !isProcessing && hasError) && <Alert severity="error">{t(msg)}</Alert>}

    </div>
  );
}

export default RegisterConfirmEmail;
