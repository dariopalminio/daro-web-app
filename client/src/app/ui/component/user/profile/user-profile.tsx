import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../../../../domain/i18n/supported-lngs";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlagIcon from "@material-ui/icons/Flag";
import StartIcon from "@material-ui/icons/StarOutline";
/**
 * User Profile
 */
const UserProfile: FunctionComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
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
              { ((i18n.language) ==lng) && <StartIcon />}
              </ListItemIcon>
              <ListItemText primary={lng} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UserProfile;
