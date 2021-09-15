import { ContactMessage } from '../../model/contact.message';
import { StartConfirmEmailMessage } from '../../model/start.confirm.email.message';

export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailMessage): Promise<any>;
  };