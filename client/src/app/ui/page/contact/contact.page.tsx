
import { FunctionComponent } from "react";
import { ContactType } from "domain/model/notification/contact.type";
import useNotification from "domain/hook/contact/notification.hook";
import Alert from "app/ui/common/alert/alert";
import { useTranslation } from 'react-i18next';
import CircularProgress from "app/ui/common/progress/circular-progress";
import ContactForm from "app/ui/component/contact/contact-form";

/**
 * Contact Page
 * 
 * Pattern: Container Component, Conditional Rendering and Custom Hooks
 */
const ContactPage: FunctionComponent = () => {
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
    <div className="page_container"  data-testid="page_container_home"> 
      <br />

      {(!isProcessing && !isSuccess) &&
        <ContactForm onSubmit={(contact: ContactType) => handleSendSubmit(contact)} 
          style={{width: "300px", margin: "34px auto auto auto"}}/>
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

export default ContactPage;