import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from '../../../../../domain/i18n/supported-lngs';

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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
      <p> {t('language.current')} {i18n.language}</p>
      <p>{t('language.availables')}</p>
      <List>
        {supportedLngs.map((lng, index) => {
          return (
            <ListItem button key={index} onClick={() => changeLanguage(lng)}>
            
              {lng}
           
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UserProfile;
