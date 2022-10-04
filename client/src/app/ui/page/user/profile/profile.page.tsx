import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import AnonymousProfile from "./anonymous-profile";
import UserProfile from "./user-profile";

/**
 * Profile Page
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const ProfilePage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { session } = useContext(SessionContext) as ISessionContext;

  const isNotLogged = () => {
    return session && !session.isLogged;
  };

  return (
      <div className="page_container"  data-testid="page_container_profile">

        {isNotLogged() && <AnonymousProfile />}

        <UserProfile />

      </div>
  );
};

export default ProfilePage;