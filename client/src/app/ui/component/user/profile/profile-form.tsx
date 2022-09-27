import "./profile-form.css";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "../../../common/button/button";
import TextField from "../../../common/text-field/text-field";
import ListBox from "../../../common/list-box/list-box";
import ProfileLanguage from "./profile-language";
import MyAddresses from "./my-addresses";

const validationFlagInit = {
  userName: true,
  firstName: true,
  lastName: true,
  email: true,
  docType: true,
  document: true,
  telephone: true,
  language: true,
  addresses: true,
};

interface Props {
  initialized: boolean;
  profile: any;
  onChange: (profile: any) => void;
  onSubmit: () => void;
  style?: any;
}

/**
 * LoginForm
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const ProfileForm: React.FC<Props> = ({ initialized, profile, onChange, onSubmit, style }) => {
  const docTypeOptions = ["RUT", "DNI", "OTHER", "None"];
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const { t, i18n } = useTranslation();

  const expresionsRegular = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    telephone: /^\d{7,14}$/ // 7 to 14 numbers.
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit();
  };

  const handleLanguageChange = (len: string): void => {
    onChange({
      ...profile,
      language: len
    })
  };

  const handleFirstNameChange = async (firstNameValue: string) => {
    onChange({
      ...profile,
      firstName: firstNameValue
    });

    if (expresionsRegular.firstName.test(firstNameValue)) {
      setValidationFlag({
        ...validationFlag,
        firstName: true
      });
    } else {
      setValidationFlag({
        ...validationFlag,
        firstName: false
      });
    }
  };

  const handleLastNameChange = async (lastNameValue: string) => {
    onChange({
      ...profile,
      lastName: lastNameValue
    });
    if (expresionsRegular.lastName.test(lastNameValue)) {
      setValidationFlag({
        ...validationFlag,
        lastName: true
      });
    } else {
      setValidationFlag({
        ...validationFlag,
        lastName: false
      });
    }
  };

  const handleDocTypeChange = async (docTypeValue: string) => {
    onChange({
      ...profile,
      docType: docTypeValue
    })
  };

  const handleDocumentChange = async (documentValue: string) => {
    onChange({
      ...profile,
      document: documentValue
    })
  };

  const handleTelephoneChange = async (telephoneValue: string) => {
    onChange({
      ...profile,
      telephone: telephoneValue
    })
  };

  const fieldsAreValid = () => {
    if (validationFlag.firstName && validationFlag.lastName) return true;
    return false;
  };

  const handleAddClose = (newAddresses: Array<any>): void => {
    onChange({
      ...profile,
      addresses: newAddresses
    })
  };

  return (
    <div style={style? style : {}}>
      <form
        id="RegisterForm"
        data-testid="RegisterForm"
        action="#"
        onSubmit={handleUpdateSubmit}
      >
        <div className="wrapper-user-profile">
          <div className="wrapper-user-data">

            <h1>
              {t('profile.title')}
            </h1>

              <TextField
                id="standard-basic-1"
                label={t('profile.label.firstname')}
                placeholder=""
                onChange={(e) => handleFirstNameChange(e.target.value)}
                value={profile.firstName}
                {...(!validationFlag.firstName && {
                  error: true,
                  helperText: t('register.info.helper.text.required')
                })}
              />
            
              <TextField
                id="standard-basic-2"
                label={t('profile.label.lastname')}
                placeholder=""
                onChange={(e) => handleLastNameChange(e.target.value)}
                value={profile.lastName}
                {...(!validationFlag.lastName && {
                  error: true,
                  helperText: t('register.info.helper.text.required'),
                })}
              />
      
              <TextField
                id="standard-basic-3"
                label={t('profile.label.email')}
                placeholder="you@email.com"
                onChange={(e) => { }}
                value={profile.email}
              />
        
              <ListBox
                id="demo-select-small"
                label={t('profile.docType')}
                value={profile.docType}
                options={docTypeOptions}
                onChange={(selectedOption) => handleDocTypeChange(selectedOption)}
              />

              <TextField
                id="standard-basic-5"
                label={t('profile.document')}
                onChange={(e) => handleDocumentChange(e.target.value)}
                value={profile.document}
              />
           
              <TextField
                id="standard-basic-5"
                label={t('profile.telephone')}
                onChange={(e) => handleTelephoneChange(e.target.value)}
                value={profile.telephone}

              />
           
              <ProfileLanguage
                onChange={(len: string) => handleLanguageChange(len)} />

          </div>

          <div className="wrapper-user-address">
            {initialized &&
              <MyAddresses addresses={profile.addresses}
                onChange={(newAddresses: Array<any>) => handleAddClose(newAddresses)}>
              </MyAddresses>
            }

          </div>

        </div>

        <div className="wrapper-user-action">
          {fieldsAreValid() &&
            <Button
              type="submit"
              style={{ "margin-top": "5px" }}
            >
              {t('profile.command.submit')}
            </Button>
          }
          {!fieldsAreValid() &&
            <Button
              style={{ "margin-top": "5px" }}
              disabled
            >
              {t('profile.command.submit')}
            </Button>
          }
        </div>

      </form>
    </div>
  );
};

export default ProfileForm;
