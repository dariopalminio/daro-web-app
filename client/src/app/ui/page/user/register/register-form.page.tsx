import RegisterForm from "app/ui/component/user/register/register-form";
import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import useRegister from "domain/hook/auth/register.hook";
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import Alert from "app/ui/common/alert/alert";
import CircularProgress from "app/ui/common/progress/circular-progress";
import { useHistory } from "react-router-dom";

const userToRegisterInitialized = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

/**
 * Register Page (Register STEP 1)
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const RegisterPage: FunctionComponent = () => {
  const [user, setUser] = useState(userToRegisterInitialized);
  const { t } = useTranslation();
  const { isProcessing, isSuccess, hasError, msg, register } =
    useRegister(); //Custom Hooks
  const history = useHistory();
    
    useEffect(() => {
      console.log("RegisterPage-->useEffect");
    }, []);
    
  const errorText = {
    firstName: t('register.info.helper.text.required'),
    lastName: t('register.info.helper.text.required'), // Letters and spaces can carry accents.
    email: t('register.email.invalid'),
    password: t('register.password.invalid'),
    confirmPass: t('register.password.not.match')
  };

  const expressions = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{10,}$/gs
  };

  const handleOnChange = (userUpdated: any) => {
    setUser(userUpdated);
  };
  
  // Register action
  const handleOnSubmit = () => {
    register(user.firstName, user.lastName, user.email, user.password); //submit to server
  };

  const redirectToStep2 = () => {
    history.push("/user/register/confirm/start");
  }

  return (
    <div className="page_container">
      {isSuccess && redirectToStep2()}

      {!isSuccess && (
        <RegisterForm
          user={user}
          regExpressions={expressions}
          validationErrorMessages={errorText}
          onChange={(userUpdated: any) => handleOnChange(userUpdated)}
          onSubmit={handleOnSubmit}
          style={{width: "300px", margin: "34px auto auto auto"}}
        />
      )}

      {isProcessing && (
        <CircularProgress>{t(msg)}</CircularProgress>
      )}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

    </div>
  );
};

export default RegisterPage;
