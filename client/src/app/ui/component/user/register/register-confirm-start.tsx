import emailToConfirmImage from "../../../image/email_to_confirm.png";
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import Paper from "../../../common/paper/paper";
import Alert from "../../../common/alert/alert";

 interface Props {
  successMsg: string;
  message: string;
  onClick: () => void;
  style?: any;
}

/**
 * Verify Register Confirm Component
 * View to send confirmation email.
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
 const RegisterConfirmStart: React.FC<Props> = ({ successMsg, message, onClick, style }) => {
  const { t, i18n } = useTranslation();

  return (
    <Paper style={style ? style : {}}>
    <Alert severity="success">
      {successMsg}
    </Alert>
    <div>
    <img src={String(emailToConfirmImage)} alt="emailToConfirmImage" style={{width:"45%", height:"45%"}}/>
    </div>

    <div>
      <h1>
        {message}
      </h1>
    </div>

    <div>
      <Button
        onClick={() => onClick()}
      >
        {t('register.command.email.send')}
      </Button>
    </div>

  </Paper>
  );
};

export default RegisterConfirmStart;
