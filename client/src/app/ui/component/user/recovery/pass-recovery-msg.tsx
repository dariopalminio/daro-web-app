import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import emailSentImage from "../../../image/email_sent.png";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    linkClass: {
      paddingTop: "1.5em",
      position: "relative",
      rigt: "1em",
    },
    paperLoginForm: {
      width: "300px",
      margin: "0 auto 0 auto",
      padding: "0px 0px 0px 0px",
    },
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
    wrapperCenterForButton: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    h1Custom: {
      fontSize: "1.5em",
      color: "#525252",
      paddingLeft: "1rem",
    },
  })
);

/**
 * PassRecoveryCallToActionMsg
 *
 * @visibleName PassRecoveryCallToActionMsg
 */
const PassRecoveryMsg: FunctionComponent = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>

          <Paper className={clsx(classes.paperLoginForm)}>
            <div className={clsx(classes.wrapperCenter)}>
              <h1 className={clsx(classes.h1Custom)}>{t('message.info.thank.you')}</h1>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
            {t('recovery.info.sent.pass')} 
            </div>

            <div className={clsx(classes.wrapperCenter)}>
              <img src={String(emailSentImage)} alt="emailSentImage" style={{width:"45%", height:"45%"}}/>
            </div>

            <div className={clsx(classes.wrapperCenter)}>
            {t('recovery.info.check.email.is.correct')}
            </div>

          </Paper>
      <br />
    </div>
  );
};

export default PassRecoveryMsg;
