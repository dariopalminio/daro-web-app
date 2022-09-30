import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../../../../domain/i18n/supported-lngs";
import ListBox from "../../../common/list-box/list-box";

/**
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
 */

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
      <ListBox
                id="demo-select-small"
                label={t("language.current")}
                value={i18n.language}
                options={supportedLngs}
                onChange={(selectedOption) => changeLanguage(selectedOption)}
                style={{marginTop: "15px"}}
              />
              
    </div>
  );
};


