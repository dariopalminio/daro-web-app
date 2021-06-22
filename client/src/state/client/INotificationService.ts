import { ContactType } from '../../state/model/notification/ContactType';

//Interface to do dependency inversion
export interface INotificationService {
    sendContactEmailService: (contactData: ContactType, token: string) => Promise<any>;
  };