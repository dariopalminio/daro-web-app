import { createContext } from 'react';
import { PermissionType, SessionType } from '../model/auth/session.type';
import { DefaultSession as SessionDefaultValue} from '../../domain/model/auth/default-session';


// Global user session context interface for provider
export interface ISessionContext {
  session:  SessionType 
  setNewSession: (newSession: SessionType) => void
  removeSessionValue: () => void,
  permission: string,
};

// Initial values for global user context 
export const SessionContextDefaultValues: ISessionContext = {
  session: SessionDefaultValue,
  setNewSession: () => { },
  removeSessionValue: () => { },
  permission: PermissionType.ANONYMOUS,
};

// Global session context
const SessionContext = createContext<ISessionContext>(SessionContextDefaultValues);


export default SessionContext;