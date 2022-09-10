import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../../../../domain/i18n/supported-lngs";
import SessionContext, {
  ISessionContext,
} from "../../../../../domain/context/session.context";
import AnonymousProfile from "./anonymous-profile";
import UserProfile from "./user-profile";

//@material-ui https://v4.mui.com/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlagIcon from "@material-ui/icons/Flag";
import StartIcon from "@material-ui/icons/StarOutline";

/**
 * User Profile Language component
 */
export default function ProfileLanguage({ onChange }: any) {

  const { t, i18n } = useTranslation();


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onChange(lng); //set language in parent
  };

  return (
    <div>
      {" "}
      {t("language.current")}
      <List>
        {supportedLngs.map((lng, index) => {
          return (
            <ListItem button key={index} onClick={() => changeLanguage(lng)}>
              <ListItemIcon>
                <FlagIcon />
                {((i18n.language) === lng) && <StartIcon />}
              </ListItemIcon>
              <ListItemText primary={lng} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};


