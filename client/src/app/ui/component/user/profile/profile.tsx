import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import AnonymousProfile from "./anonymous-profile";
import UserProfile from "./user-profile";

/**
 * User Profile
 */
const Profile: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { session } = useContext(SessionContext) as ISessionContext;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isNotLogged = () => {
    return session && !session.isLogged;
  };

  return (
    <div>

      {isNotLogged() && <AnonymousProfile />}

    <UserProfile />

    </div>
  );
};

export default Profile;
