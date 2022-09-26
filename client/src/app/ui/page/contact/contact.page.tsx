
import React, { FunctionComponent } from "react";
import { ContactType } from "../../../../domain/model/notification/contact.type";
import useNotification from "../../../../domain/hook/contact/notification.hook";
import Alert from "../../common/alert/alert";
import { useTranslation } from 'react-i18next';
import CircularProgress from "../../common/progress/circular-progress";
import ContactForm from "../../component/contact/contact-form";

/**
 * Contact Page
 * 
 * Pattern: Container Component, Conditional Rendering and Custom Hooks
 */
export const ContactPage: FunctionComponent = () => {
  const { isProcessing, hasError, msg, isSuccess, sendContactEmail } =
    useNotification(); // Custom Hooks
  const { t } = useTranslation();

  /**
   * send Submit
   */
  const handleSendSubmit = (contact: ContactType) => {
    sendContactEmail(contact);
  };

  return (
    <div className="container-page">
      <br />

      {(!isProcessing && !isSuccess) &&
        <ContactForm onSubmit={(contact: ContactType) => handleSendSubmit(contact)} />
      }

      {
        isProcessing && (
          <div className="box">
            <strong>
              {t('contact.info.sending.email')}
            </strong>
            <CircularProgress />
          </div>
        )
      }

      {hasError && <Alert severity="error">{t(msg)} </Alert>}

      {isSuccess && <Alert severity="success">{t('contact.success.sent.email')}</Alert>}

    </div >
  );
};