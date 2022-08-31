import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../../../../domain/i18n/supported-lngs";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import AnonymousProfile from "./anonymous-profile";
import UserProfile from "./user-profile";

//@material-ui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlagIcon from "@material-ui/icons/Flag";
import StartIcon from "@material-ui/icons/StarOutline";
/**
 * User Profile
 */
const Profile: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { session } = useContext(SessionContext) as ISessionContext;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>

      {!session?.isLogged && <AnonymousProfile />}

      {session?.isLogged && <UserProfile />}

      <p>
        {" "}
        {t("language.current")}
      </p>
      
      <List>
        {supportedLngs.map((lng, index) => {
          return (
            <ListItem button key={index} onClick={() => changeLanguage(lng)}>
              <ListItemIcon>
              <FlagIcon />
              { ((i18n.language) === lng) && <StartIcon />}
              </ListItemIcon>
              <ListItemText primary={lng} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Profile;
