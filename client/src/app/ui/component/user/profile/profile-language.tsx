import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../../../../domain/i18n/supported-lngs";
import ListBox from "../../../common/list-box/list-box";
import { SelectOpts } from "../../../common/select-opts";

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
    console.log('ProfileLanguage.lng', lng);
    i18n.changeLanguage(lng);
    onChange(lng); //set language in parent
  };

  return (
    <div>

<SelectOpts 
  label="Tu lenguaje actual es:" 
  list={supportedLngs} 
  selectedOption={i18n.language} 
  setSelectedOption={(selectedOption) => changeLanguage(selectedOption)} />

    
              
    </div>
  );
};


