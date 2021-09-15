import { ContactMessage } from '../../model/contact.message';
import { StartConfirmEmailData } from '../../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../model/register/end.confirm.email.data';

export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
    sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any>;
  };