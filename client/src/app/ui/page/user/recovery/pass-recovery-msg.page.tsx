import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import emailSentImage from "../../../image/email_sent.png";
import Paper from "../../../common/paper/paper";

/**
 * PassRecoveryCallToActionMsg (Password recovery STEP 2)
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const PassRecoveryMsgPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="page_container" data-testid="page_container_recovery_step2">

          <Paper>
            <div>
              <h1>{t('message.info.thank.you')}</h1>
            </div>

            <div>
            {t('recovery.info.sent.pass')} 
            </div>

            <div>
              <img src={String(emailSentImage)} alt="emailSentImage" style={{width:"45%", height:"45%"}}/>
            </div>

            <div>
            {t('recovery.info.check.email.is.correct')}
            </div>
          </Paper>
      <br />

    </div>
  );
};

export default PassRecoveryMsgPage;
