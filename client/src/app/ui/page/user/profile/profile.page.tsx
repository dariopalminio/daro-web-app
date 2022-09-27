import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import AnonymousProfile from "./anonymous-profile";
import UserProfile from "./user-profile";

export const ProfilePage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { session } = useContext(SessionContext) as ISessionContext;

  const isNotLogged = () => {
    return session && !session.isLogged;
  };

  return (
    <>
      <div className="page_container">

        {isNotLogged() && <AnonymousProfile />}

        <UserProfile />

      </div>
    </>
  );
};